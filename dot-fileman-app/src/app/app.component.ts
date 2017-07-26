import { Component } from '@angular/core';
import {AppRoutingService} from './app-routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private appRoutingService: AppRoutingService
  ) {}
  title = 'app';

  openLogin() {
    this.appRoutingService.openLogin();
  }
  openImageBrowser() {
    this.appRoutingService.openImageBrowser();
  }
}
