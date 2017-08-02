import {Injectable} from '@angular/core';
import {JWTAuthService} from 'dotcms-js/dotcms-js/core/util/jwt-auth.service';
import {SettingsStorageService} from 'dotcms-js/dotcms-js/core/util/settings-storage.service';
import {ConfigSettings} from './login/login.component';

@Injectable()
export class SettingsService {

  configKey: string;

  constructor(
    private authService: JWTAuthService,
    private settingsStorageService: SettingsStorageService
  ) {}

  saveConfigSettings(configSettings: ConfigSettings) {
    this.authService.getJWT(configSettings.siteURL, configSettings.userName, configSettings.password)
      .subscribe(
        token => {
          this.settingsStorageService.storeSettings(configSettings.siteURL, token);
        });
  }

}
