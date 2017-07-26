import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ImageBrowserComponent} from '../image-browser/image-browser.component';
import {LoginComponent} from '../login/login.component';

const routes: Routes = [
  {
    path: 'image-browser',
    component: ImageBrowserComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
