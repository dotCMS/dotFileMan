import { Component, OnInit } from '@angular/core';
import {SettingsStorageService} from 'dotcms-js/core/util/settings-storage.service';
import {SettingsService} from '../settings.service';
import {DotSettings} from 'dotcms-js/core/util/settings.model';
import {AppRoutingService} from '../app-routing.service';

export class ConfigSettings {
  siteURL: string
  userName: string
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  configSettings: ConfigSettings = new ConfigSettings();
  dotConf: DotSettings;
  constructor(
    private settingsStorageService: SettingsStorageService,
    private settingsService: SettingsService,
    private appRoutingService: AppRoutingService
  ) {
    this.dotConf = this.settingsStorageService.getSettings();
    if (!this.dotConf) {
      this.dotConf = new DotSettings();
    }else {
      this.configSettings.siteURL = this.dotConf.site;
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    this.settingsService.saveConfigSettings(this.configSettings)
      .subscribe(
        token => {
          this.settingsStorageService.storeSettings(this.configSettings.siteURL, token);
          this.appRoutingService.openImageBrowser();
        });
  }

  removeCurrentToken() {
    this.settingsStorageService.clearSettings();
    location.reload();
  }
}
