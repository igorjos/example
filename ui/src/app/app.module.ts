import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FilesystemService } from './services/filesystem.service';
import { ApiInterceptorInterceptor } from './interceptors/api-interceptor.interceptor';
import { DirPathsComponent } from './components/dir-paths/dir-paths.component';
import { SearchPathsComponent } from './components/search-paths/search-paths.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    LayoutComponent,
    DirPathsComponent,
    SearchPathsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorInterceptor,
      multi: true
    },
    FilesystemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
