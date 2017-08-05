import {Inject, Injectable} from '@angular/core';
import {HttpClient, LoggerService, NotificationService} from 'dotcms-js/dotcms-js';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {Observable} from 'rxjs/Observable';
import {Treeable} from 'dotcms-js/dotcms-js/core/treeable/shared/treeable.model';
import {File} from 'dotcms-js/dotcms-js/core/treeable/shared/file.model';
import {Response} from '@angular/http';

@Injectable()
@Inject('httpClient')
@Inject('notificationService')
@Inject('log')
export class ContentSearchService {

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService,
    private log: LoggerService
  ) { }

  search(query: string): Observable < Treeable[] > {
    return this.httpClient.get('/api/content/render/false/query/' + query)
      .map((res: Response) => this.extractDataFilter(res))
      .catch(error => this.handleError(error));
  }

  private extractDataFilter(res: Response): Treeable[] {
    const treeables: Treeable[] = [];
    const obj = JSON.parse(res.text());
    const results: any[] = obj.entity.result;
    for (let i = 0; i < results.length; i++) {
      const r: any = results[i];
      let t: Treeable;
        t = Object.assign(new File(), r);
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
