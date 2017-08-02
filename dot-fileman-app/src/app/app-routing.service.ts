import {Injectable, NgZone} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class AppRoutingService {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone
  ) {}
  openLogin() {
    this.ngZone.run(() => {
      this.router.navigate(['login']);
    });
  }
  openImageBrowser() {
    this.ngZone.run(() => {
      this.router.navigate(['image-browser']);
    });
  }
}
