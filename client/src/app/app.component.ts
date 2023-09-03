import { Component } from '@angular/core';
import { FilesService } from './state/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private filesService: FilesService) {
    this.filesService.getFiles().subscribe()
  }

}
