import {Injectable, NgZone} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class AppRoutingService {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone
  ) {}
  loginOpen; boolean = false;
  openLogin() {
    this.ngZone.run(() => {
      this.router.navigate(['login']);
    });
    this.loginOpen = true;
  }
  openImageBrowser() {
    this.ngZone.run(() => {
      this.router.navigate(['image-browser']);
    });
    this.loginOpen = false;
  }
  isLoginOpen() {
    return this.loginOpen;
  }
}
