import {Component, OnInit} from '@angular/core';
import {AppRoutingService} from './app-routing.service';
import {SettingsStorageService} from 'dotcms-js/dotcms-js';
import {MenuItem} from 'primeng/primeng';
import {ContentSearchService} from './content-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private settingsStorageService: SettingsStorageService,
    private appRoutingService: AppRoutingService,
    private contentSearchService: ContentSearchService
  ) {
    contentSearchService.searchQuery
      .subscribe(searchQuery => {
        this.searchQuery = searchQuery;
      });
  }
  title = 'app';
  items: MenuItem[];
  searchQuery: string;

  updateSearch() {
    this.contentSearchService.changeSearchQuery(this.searchQuery);
  }

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
