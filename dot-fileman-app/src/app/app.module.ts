import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { ImageBrowserComponent } from './image-browser/image-browser.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppRoutingService} from './app-routing.service';
import {
  AutoCompleteModule, BreadcrumbModule,
  ButtonModule, DataTableModule, DragDropModule, InputTextModule, MenuModule, PasswordModule, SharedModule, TreeModule,
  TreeTableModule
} from 'primeng/primeng';
import {SettingsStorageService} from 'dotcms-js/dotcms-js/core/util/settings-storage.service';
import {LocalStoreService} from 'dotcms-js/dotcms-js/core/util/local-store.service';
import {SiteBrowserState} from 'dotcms-js/dotcms-js/core/util/site-browser.state';
import {AppConfig} from 'dotcms-js/dotcms-js/core/app.config';
import {HttpClient} from 'dotcms-js/dotcms-js/core/util/http.service';
import {NotificationService} from 'dotcms-js/dotcms-js/core/util/notification.service';
import {SiteTreetableService} from 'dotcms-js/dotcms-js/components/site-treetable/site-treetable.service';
import {SiteBrowserService} from 'dotcms-js/dotcms-js/core/util/site-browser.service';
import {SiteSelectorService} from 'dotcms-js/dotcms-js/components/site-selector/site-selector.service';
import {LoggerService} from 'dotcms-js/dotcms-js/core/util/logger.service';
import {JWTAuthService} from 'dotcms-js/dotcms-js/core/util/jwt-auth.service';
import {Logger, LOG_LOGGER_PROVIDERS, Options as LoggerOptions, Level as LoggerLevel} from 'angular2-logger/core';
import {HttpModule, JsonpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {DotcmsSiteSelectorModule} from 'dotcms-js/dotcms-js/components/site-selector/site-selector.component';

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
    DotcmsSiteSelectorModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    ImageBrowserComponent
  ],
  providers: [
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
    {provide: SiteTreetableService, useClass: SiteTreetableService},
    {provide: SiteSelectorService, useClass: SiteSelectorService},
    {provide: JWTAuthService, useClass: JWTAuthService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
