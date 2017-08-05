import {MenuItem} from 'primeng/components/common/api';
import {Component, Inject} from '@angular/core';
import {SiteBrowserState} from 'dotcms-js/dotcms-js';

/**
 * The BreadcrumbComponent provides a PrimeNG Component for providing navigation with dotCMS Components
 * It can respond to the Site or Folder being changed.  In addition the navigation it provides can be clicked on
 * There is no connection to the other components directly.  The interaction is all managed by the [[SiteBrowserState]]
 */
@Component({
  selector: 'app-breadcrumb',
  template: `
    <p-breadcrumb [home]="homeItem" [model]="pathItems"></p-breadcrumb>
    <p-dialog header="Upload Files" [contentStyle]="{'overflow':'visible'}" [closable]="true" [(visible)]="hostDialog" [responsive]="true" showEffect="fade" [modal]="true" (onAfterHide)="closeHostSelect()" width="500">
      <site-selector></site-selector>
    </p-dialog>
  `
})
@Inject('updateService')
export class BreadcrumbComponent {

  homeItem: MenuItem = {label: 'Host Select', command: (event) => {this.openHostSelectDialog(); }};
  pathItems: MenuItem[];
  hostDialog: boolean;

  constructor(private updateService: SiteBrowserState) {
    this.buildMenuItemsFromURI(this.updateService.getURI());
    updateService.currentSite.subscribe(
      siteName => {
        this.onSiteChange(siteName);
      });
    updateService.currentFolder.subscribe(
      folderName => {
        this.onFolderClick(folderName);
      });
    updateService.currentURI.subscribe(
      uri => {
        this.buildMenuItemsFromURI(uri);
      });
  }

  openHostSelectDialog(): void {
    this.hostDialog = true;
  }

  closeHostSelect(): void {
    this.hostDialog = false;
  }

  /**
   * Called when the [[SiteBrowserState]] Site is changed. This is managed via a Subscription
   * @param siteName
   */
  onSiteChange(siteName: string): void {
    this.pathItems = [];
    this.addSiteItem(siteName);
    this.closeHostSelect();
  }

  /**
   * Called when the [[SiteBrowserState]] Folder is changed. This is managed via a Subscription
   * @param folderName
   */
  onFolderClick(folderName: string): void {
    if (!folderName) {
      return;
    }
    const uri: string = this.getCurrentURI() + '/' + folderName;
    this.addFolderItem(folderName);
  }

  private getCurrentURI(): string {
    let uri = '';
    for (let i = 1; i < this.pathItems.length; i++) {
      const pi: MenuItem = this.pathItems[i];
      uri = uri + '/' + pi.label;
    }
    return uri;
  }

  private addSiteItem(siteName: string): void {
    this.pathItems.push({
      command: (event: Event) => {
        this.updateService.changeSite(siteName);
        this.updateService.changeURI(null);
        this.updateService.changeFolder(null);
        setTimeout(() => {
        }, 100);
      }, label: siteName
    });
  }

  private addFolderItem(folderName: string): void {
    const currentURI: string = this.getCurrentURI();
    this.pathItems.push({
      command: (event: Event) => {
        this.updateService.changeURI(currentURI + '/' + folderName);
        setTimeout(() => {
        }, 100);
      }, label: folderName
    });
  }

  private buildMenuItemsFromURI(uri: string): void {
    this.pathItems = [];
    const siteName: string = this.updateService.getSelectedSite();
    if (!siteName) {
      return;
    }
    this.addSiteItem(siteName);
    if (uri) {
      const folders: string[] = uri.split('/');
      for (let i = 0; i < folders.length; i++) {
        this.onFolderClick(folders[i]);
      }
    }
  }
}
