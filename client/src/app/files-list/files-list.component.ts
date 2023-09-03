import { Component, EventEmitter, Output } from '@angular/core';
import { FilesQuery } from '../state/state.query';
import { FilesService } from '../state/state.service';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss']
})
export class FilesListComponent {

  @Output() close: EventEmitter<void> = new EventEmitter();

  public files$ = this.filesQuery.selectFiles$;

  constructor(private filesQuery: FilesQuery, private filesService: FilesService) { }

  downloadFile(filename: string): void {
    this.filesService.downloadFile(filename).subscribe((data: any) => {
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = filename;
      link.click();
    })
  }

}
