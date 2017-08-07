import {Inject, Injectable} from '@angular/core';
import {HttpClient, LoggerService, NotificationService} from 'dotcms-js/dotcms-js';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {Observable} from 'rxjs/Observable';
import {Treeable} from 'dotcms-js/dotcms-js/core/treeable/shared/treeable.model';
import {File} from 'dotcms-js/dotcms-js/core/treeable/shared/file.model';
import {Response} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
@Inject('httpClient')
@Inject('notificationService')
@Inject('log')
export class ContentSearchService {

  searchQuery: Observable<string>;
  private searchQuerySubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService,
    private log: LoggerService,
  ) {
    this.searchQuery = this.searchQuerySubject.asObservable();
  }

  changeSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }
  getSearchQuery(): string {
    return <string> this.searchQuerySubject.getValue();
  }

  search(query: string): Observable < Treeable[] > {
    return this.httpClient.get('/api/content/render/false/query/' + query)
      .map((res: Response) => this.extractDataFilter(res))
      .catch(error => this.handleError(error));
  }

  private extractDataFilter(res: Response): Treeable[] {
    const treeables: Treeable[] = [];
    const obj = JSON.parse(res.text());
    const results: any[] = obj.contentlets;
    for (let i = 0; i < results.length; i++) {
      const r: any = results[i];
      let t: File;
      t = Object.assign(new File(), r);
      t.modUserName = r.modUser;
      t.mimeType = r.metaData.contentType;
      t.type = 'file_asset';
      treeables[i] = t;
    }
    return treeables;
  }

  private handleError(error: any): ErrorObservable {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    if (errMsg) {
      this.log.error(errMsg);
      this.notificationService.displayErrorMessage('There was an error; please try again : ' + errMsg);
      return Observable.throw(errMsg);
    }
  }

}
