import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SettingsService } from './settings.service';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { ImageBrowserComponent } from './image-browser/image-browser.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppRoutingService} from './app-routing.service';
import {
  AutoCompleteModule, BreadcrumbModule,
  ButtonModule, DataGridModule, DataTableModule, DialogModule, DragDropModule, FileUploadModule, InputTextModule,
  MenuModule, PanelModule,
  PasswordModule,
  SharedModule, SplitButtonModule, TreeModule,
  TreeTableModule
} from 'primeng/primeng';
import {HttpModule, JsonpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {
  DotFileModule, DotFolderModule,
  DotHttpModule, DotNotificationModule, DotSettingsStorageModule, DotSiteBrowserModule,
  DotSiteSelectorModule
} from 'dotcms-js/dotcms-js';
import { DataGridComponent } from './image-browser/data-grid/data-grid.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BreadcrumbComponent } from './image-browser/breadcrumb/breadcrumb.component';
import {ContentSearchService} from './content-search.service';

@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    JsonpModule,
    AppRoutingModule,
    TreeTableModule,
    SharedModule,
    TreeModule,
    DataTableModule,
    AutoCompleteModule,
    FormsModule,
    BreadcrumbModule,
    MenuModule,
    DragDropModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    DataGridModule,
    PanelModule,
    BrowserAnimationsModule,
    DialogModule,
    FileUploadModule,
    SplitButtonModule,
    DotSiteSelectorModule,
    DotHttpModule,
    DotSettingsStorageModule,
    DotNotificationModule,
    DotFileModule,
    DotSiteBrowserModule,
    DotFolderModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    ImageBrowserComponent,
    DataGridComponent,
    BreadcrumbComponent
  ],
  providers: [
    {provide: SettingsService, useClass: SettingsService},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: AppRoutingService, useClass: AppRoutingService},
    {provide: ContentSearchService, useClass: ContentSearchService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
