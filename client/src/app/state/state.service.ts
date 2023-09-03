import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilesStore } from './state.store';
import { tap } from 'rxjs';
import { FilesQuery } from './state.query';

@Injectable({ providedIn: 'root' })
export class FilesService {

    private httpOptions = {
        headers: new HttpHeaders().delete('Content-Type')
    };

    constructor(private filesStore: FilesStore, private http: HttpClient) { }

    getFiles() {
        return this.http.get<string[]>('files')
            .pipe(tap((files) => this.filesStore.update({ files: files })))
    }

    uploadFile(file: any, name: string) {
        const formData: FormData = new FormData();
        formData.append('file', file, name);

        return this.http.post<{ filename: string }>('files', formData, this.httpOptions)
            .pipe(tap(res =>
                this.filesStore.update(state => ({
                    files: [...state.files, res.filename]
                }))
            ))
    }

    downloadFile(filename: string) {
        return this.http.get('files/' + filename, { responseType: 'blob' })
    }

}