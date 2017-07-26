import {Injectable, NgZone} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class AppRoutingService {

  loginOpened = false;
  imageBrowserOpened = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone
  ) {}
  openLogin() {
    if (this.loginOpened) {
      this.ngZone.run(() => {
        this.router.navigate(['']);
        this.loginOpened = false;
      });
    }else {
      this.ngZone.run(() => {
        this.router.navigate(['/login']);
        this.loginOpened = true;
      });
    }
  }
  openImageBrowser() {
    if (this.imageBrowserOpened) {
      this.ngZone.run(() => {
        this.router.navigate(['']);
        this.imageBrowserOpened = false;
      });
    }else {
      this.ngZone.run(() => {
        this.router.navigate(['/image-browser']);
        this.imageBrowserOpened = true;
      });
    }
  }
}
