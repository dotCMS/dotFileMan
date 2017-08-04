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
import {Logger, LOG_LOGGER_PROVIDERS, Options as LoggerOptions, Level as LoggerLevel} from 'angular2-logger/core';
import {HttpModule, JsonpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {
  AppConfig,
  DotcmsBreadcrumbModule, DotcmsSiteSelectorModule, FileService, FolderService, HttpClient, JWTAuthService,
  LocalStoreService,
  LoggerService,
  NotificationService,
  SettingsStorageService, SiteBrowserService,
  SiteBrowserState, SiteSelectorService, SiteTreetableService
} from 'dotcms-js/dotcms-js';
import { DataGridComponent } from './image-browser/data-grid/data-grid.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
    DotcmsSiteSelectorModule,
    DotcmsBreadcrumbModule,
    DataGridModule,
    PanelModule,
    BrowserAnimationsModule,
    DialogModule,
    FileUploadModule,
    SplitButtonModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    ImageBrowserComponent,
    DataGridComponent
  ],
  providers: [
    {provide: SettingsService, useClass: SettingsService},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: AppRoutingService, useClass: AppRoutingService},
    {provide: LoggerOptions, useValue: { level: LoggerLevel.INFO } }, Logger,
    {provide: LoggerService, useClass: LoggerService},
    {provide: SiteBrowserState, useClass: SiteBrowserState},
    {provide: LocalStoreService, useClass: LocalStoreService},
    {provide: AppConfig, useClass: AppConfig},
    {provide: SettingsStorageService, useClass: SettingsStorageService},
    {provide: HttpClient, useClass: HttpClient},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: NotificationService, useClass: NotificationService},
    {provide: SiteBrowserService, useClass: SiteBrowserService},
    {provide: FolderService, useClass: FolderService},
    {provide: SiteTreetableService, useClass: SiteTreetableService},
    {provide: SiteSelectorService, useClass: SiteSelectorService},
    {provide: JWTAuthService, useClass: JWTAuthService},
    {provide: FileService, useClass: FileService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
