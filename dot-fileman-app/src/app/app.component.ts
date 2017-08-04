import {Component, OnInit} from '@angular/core';
import {AppRoutingService} from './app-routing.service';
import {SettingsStorageService} from 'dotcms-js/dotcms-js';
import {MenuItem} from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private settingsStorageService: SettingsStorageService,
    private appRoutingService: AppRoutingService
  ) {}
  title = 'app';
  items: MenuItem[];

  ngOnInit() {
    if (!this.settingsStorageService.getSettings().jwt) {
      this.appRoutingService.openLogin();
    }else {
      this.appRoutingService.openImageBrowser();
    }
    this.items = [
      {label: 'Browser', icon: 'fa fa-picture-o', command: () => {
        this.openImageBrowser();
      }}
    ];
  }

  openLogin() {
    this.appRoutingService.openLogin();
  }
  openImageBrowser() {
    this.appRoutingService.openImageBrowser();
  }
}
