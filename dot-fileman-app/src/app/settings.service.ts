import {Injectable} from '@angular/core';
import {JWTAuthService} from 'dotcms-js/core/util/jwt-auth.service';
import {SettingsStorageService} from 'dotcms-js/core/util/settings-storage.service';
import {ConfigSettings} from './login/login.component';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SettingsService {

  configKey: string;

  constructor(
    private authService: JWTAuthService,
    private settingsStorageService: SettingsStorageService
  ) {}

  saveConfigSettings(configSettings: ConfigSettings): Observable<string> {
    return this.authService.getJWT(configSettings.siteURL, configSettings.userName, configSettings.password);
  }

}
