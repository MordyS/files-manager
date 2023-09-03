import { Component } from '@angular/core';
import { FilesService } from '../state/state.service';
import { FilesQuery } from '../state/state.query';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent {

  constructor(private filesService: FilesService, private filesQuery: FilesQuery) { }

  public filesCount$ = this.filesQuery.selectFilesCount$
  public fileName: string = '';
  public file: any;
  public uploadedStatus: string = '';
  public showContextMenu: boolean = false;

  fileChange(event: any) {
    if (!event.target.files[0]) return;
    this.file = event.target.files[0];
  }

  uploadFile() {
    let name = this.fileName ? `${this.fileName}.${this.file.name.split('.').reverse()[0]}` : this.file.name;

    this.filesService.uploadFile(this.file, name).subscribe({
      error: error => this.uploadedStatus = 'error',
      complete: () => this.uploadedStatus = 'success'
    })
  }
}
