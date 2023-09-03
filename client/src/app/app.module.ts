import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ApiInterceptor } from './app.interceptor';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { FilesListComponent } from './files-list/files-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FileUploaderComponent,
    FilesListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
