import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { ImageBrowserComponent } from './image-browser/image-browser.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppRoutingService} from './app-routing.service';
import {ButtonModule, MenuModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ImageBrowserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    MenuModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: AppRoutingService, useClass: AppRoutingService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
