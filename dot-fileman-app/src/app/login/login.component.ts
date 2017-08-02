import { Component, OnInit } from '@angular/core';
import {SettingsStorageService} from 'dotcms-js/dotcms-js/core/util/settings-storage.service';
import {SettingsService} from '../settings.service';
import {DotSettings} from 'dotcms-js/dotcms-js/core/util/settings.model';

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
    private settingsService: SettingsService
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

    this.settingsService.saveConfigSettings(this.configSettings);
  }

  removeCurrentToken() {
    this.settingsStorageService.clearSettings();
  }
}
