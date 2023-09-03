import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { FilesStore, FilesState } from './state.store';

@Injectable({ providedIn: 'root' })
export class FilesQuery extends Query<FilesState> {

    selectFiles$ = this.select('files');
    selectFilesCount$ = this.select(state => state.files.length)
    
    constructor(protected override store: FilesStore) {
        super(store);
    }
}