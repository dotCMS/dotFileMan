import { Component, OnInit } from '@angular/core';
import {AppRoutingService} from '../app-routing.service';
import {SettingsStorageService} from 'dotcms-js/dotcms-js';

@Component({
  selector: 'app-image-browser',
  templateUrl: './image-browser.component.html',
  styleUrls: ['./image-browser.component.css']
})
export class ImageBrowserComponent implements OnInit {

  constructor(
    private settingsStorageService: SettingsStorageService,
    private appRoutingService: AppRoutingService
  ) { }

  ngOnInit() {
    if (!this.settingsStorageService.getSettings().jwt) {
      this.appRoutingService.openLogin();
    }else {
      this.appRoutingService.openImageBrowser();
    }
  }

}
