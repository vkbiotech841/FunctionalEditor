import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { CkeditorComponent } from './ckeditor/ckeditor.component';
// import { MathjaxComponent } from './mathjax/mathjax.component';
// import { QuizComponent } from './quiz/quiz.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SidenavComponent } from './components/layout/sidenav/sidenav.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { DashboardLayoutComponent } from './components/layout/dashboard-layout/dashboard-layout.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NoSanitizePipe } from './components/shared/pip/no-sanitize.pipe';
import { CkeditorComponent } from './components/pages/ckeditor/ckeditor.component';
import { MathjaxComponent } from './components/pages/mathjax/mathjax.component';
import { QuizComponent } from './components/pages/quiz/quiz.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [
    AppComponent,
    CkeditorComponent,
    MathjaxComponent,
    NoSanitizePipe,
    QuizComponent,
    SidenavComponent,
    HeaderComponent,
    FooterComponent,
    DashboardLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PerfectScrollbarModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
