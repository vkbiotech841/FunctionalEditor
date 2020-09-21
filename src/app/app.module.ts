import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CkeditorComponent } from './ckeditor/ckeditor.component';
import { FormsModule } from '@angular/forms';
import { MathjaxComponent } from './mathjax/mathjax.component';
import { NoSanitizePipe } from './pip/no-sanitize.pipe';
@NgModule({
  declarations: [
    AppComponent,
    CkeditorComponent,
    MathjaxComponent,
    NoSanitizePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CKEditorModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
