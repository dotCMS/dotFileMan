import {Component, OnInit, ViewChild} from '@angular/core';
import {Treeable} from 'dotcms-js/dotcms-js/core/treeable/shared/treeable.model';
import {
  FileService, FolderService, LoggerService, NotificationService, SettingsStorageService,
  SiteBrowserService, SiteBrowserState
} from 'dotcms-js/dotcms-js';
import {Folder} from 'dotcms-js/dotcms-js/core/treeable/shared/folder.model';
import {File} from 'dotcms-js/dotcms-js/core/treeable/shared/file.model';
import {FileUpload} from 'primeng/primeng';

@Component({
  selector: 'app-data-grid',
  styleUrls: ['./data-grid.component.css'],
  template: `
    <div class="uploadButton" style=""><button pButton type="button" label="Upload" (click)="displayUpload()"></button></div>
    <p-dataGrid [value]="treeables" [paginator]="true" [rows]="20">
      <ng-template let-treeable pTemplate="item">
        <div style="padding:3px" class="ui-g-12 ui-md-3">
          <p-panel [style]="{'text-align':'center'}">
            <span [ngSwitch]="treeable.type">
              <span *ngSwitchCase="'folder'" class="">
                <a (click)="selectTreeable(treeable)"><img src="assets/folder.png"></a>
              </span>
              <span *ngSwitchCase="'file_asset'">
                <a (click)="displayDetails(treeable)">
                  <img *ngIf="treeable.isImage() && treeable.extension!='ico'" src="{{dotCMSURL}}/contentAsset/image/{{treeable.inode}}/fileAsset/filter/Thumbnail/thumbnail_w/48/thumbnail_h/48/byInode/true">
                  <span *ngIf="!treeable.isImage() || treeable.extension=='ico'" class="" aria-hidden="true">
                    <img src="assets/file.png">
                  </span>
                </a>
              </span>
            </span>
            <div class="treeable-detail">{{treeable.title}}</div>
          </p-panel>
        </div>
      </ng-template>
    </p-dataGrid>
    <p-dialog header="Upload Files" [closable]="true" [(visible)]="uploadDialog" [responsive]="true" showEffect="fade" [modal]="true" (onAfterHide)="onUploadHide()" width="500">
    <p-fileUpload #fileUploadWidget name="myfile[]" customUpload="true" (uploadHandler)="onUpload($event)" (onSelect)="addFileToUpload($event)" (onClear)="clearUploads($event)"
                  multiple="true" accept="image/*" maxFileSize="1000000">
    </p-fileUpload>
    </p-dialog>
    <p-dialog header="File Details" [closable]="true" [(visible)]="displayDialog" [responsive]="true" showEffect="fade" [modal]="true" width="1040" (onAfterHide)="onDialogHide()">

      <div class="ui-g" *ngIf="selectedFile">
        <div class="ui-g-12 ui-md-7">
          <img *ngIf="selectedFile.isImage()" src="{{dotCMSURL}}/contentAsset/image/{{selectedFile.inode}}/fileAsset/filter/Thumbnail/thumbnail_w/530/thumbnail_h/400/byInode/true">
          <img *ngIf="!selectedFile.isImage()" src="{{dotCMSURL}}/dA/{{selectedFile.inode}}/225w" onerror="this.style.display='none'">
        </div>
        <div class="ui-g-12 ui-md-5">
          <div class="ui-g-3"><label class="treeable-detail-label">Inode</label></div>
          <div class="ui-g-9"><input class="treeable-detail-input" id="inode" type="text" pInputText [disabled]="true" [(ngModel)]="selectedFile.inode" /></div>
          <div class="ui-g-3"><label class="treeable-detail-label">Identifier</label></div>
          <div class="ui-g-9"><input class="treeable-detail-input" id="identifier" type="text" pInputText [disabled]="true" [(ngModel)]="selectedFile.identifier" /></div>
          <div class="ui-g-3"><label class="treeable-detail-label">Filename</label></div>
          <div class="ui-g-9"><input class="treeable-detail-input" id="fileName" type="text" pInputText [disabled]="true" [(ngModel)]="selectedFile.fileName" /></div>
          <div class="ui-g-3"><label class="treeable-detail-label">Title</label></div>
          <div class="ui-g-9"><input class="treeable-detail-input" id="title" type="text" pInputText [disabled]="true" [(ngModel)]="selectedFile.title" /></div>
          <div class="ui-g-3"><label class="treeable-detail-label">Edititor</label></div>
          <div class="ui-g-9"><input class="treeable-detail-input" id="modUserName" type="text" pInputText [disabled]="true" [(ngModel)]="selectedFile.modUserName" /></div>
          <div class="ui-g-3"><label class="treeable-detail-label">Path</label></div>
          <div class="ui-g-9"><input class="treeable-detail-input" id="path" type="text" pInputText [disabled]="true" [(ngModel)]="selectedFile.path" /></div>
          <div class="ui-g-3"><label class="treeable-detail-label">Mine Type</label></div>
          <div class="ui-g-9"><input class="treeable-detail-input" id="mimeType" type="text" pInputText [disabled]="true" [(ngModel)]="selectedFile.mimeType" /></div>
        </div>
      </div>
    </p-dialog>
  `
})
export class DataGridComponent implements OnInit {

  @ViewChild('fileUploadWidget') fieldUpload: FileUpload;
  dotCMSURL = '';
  siteName = '';
  treeables: Treeable[];
  displayDialog: boolean;
  uploadDialog: boolean;
  selectedFile: File;
  uploadedFiles: any[] = [];
  constructor(private updateService: SiteBrowserState,
              private fileService: FileService,
              private log: LoggerService,
              private siteBrowserService: SiteBrowserService,
              private settingsStorageService: SettingsStorageService,
              private messageService: NotificationService,
              private folderService: FolderService) {
    if (settingsStorageService.getSettings()) {this.dotCMSURL = settingsStorageService.getSettings().site; }
    this.siteName = updateService.getSelectedSite();
    if (updateService.getURI()) {
      this.loadFolder(updateService.getURI());
    }
    updateService.currentSite
      .subscribe(siteName => {
        if (siteName) {
          this.loadSite(siteName);
        }
      });
    updateService.currentURI
      .subscribe(uri => {
        if (uri) {
          this.loadFolder(uri);
        }
      });
    setTimeout(() => {
    }, 100);
  }

  ngOnInit() {
  }

  loadFolder(uri: string): void {
    this.siteBrowserService.getTreeableAssetsUnderFolder(this.siteName, uri)
      .subscribe((treeables: Treeable[]) => this.treeables = treeables);
    setTimeout(() => {}, 100);
  }

  loadSite(siteName: string): void {
    this.siteName = siteName;
    this.siteBrowserService.getTreeableAssetsUnderSite(siteName)
      .subscribe((treeables: Treeable[]) => this.treeables = treeables);
    setTimeout(() => {}, 100);
  }

  selectTreeable(treeable: Folder): void {
    this.updateService.changeURI(treeable.path);
  }

  displayDetails(file: File): void {
    this.displayDialog = true;
    this.selectedFile = file;
  }

  displayUpload(file: File): void {
    this.uploadDialog = true;
  }

  onDialogHide() {
    this.selectedFile = null;
  }

  onUploadHide() {}

  addFileToUpload(e: any) {
    for (const file of e.files) {
      this.uploadedFiles.push(file);
    }
  }

  clearUploads(e: any) {
    this.uploadedFiles = [];
  }

  onUpload(e: any) {
    const uri: String = this.updateService.getURI();
    this.folderService.loadFolderByURI(this.siteName, uri)
      .subscribe((folder: Folder) => this.uploadIntoFolder(folder, e.files));
    setTimeout(() => {}, 100);
    return;
  }

  private uploadIntoFolder(folder: Folder, files: any[]) {
    const fileContentTypeID: string = folder.defaultFileType;
    for (let i = 0; i < files.length; i++) {
      const file: any = files[i];
      this.fileService.uploadFile(file, folder.path, fileContentTypeID);
    }

    this.messageService.displayInfoMessage('Uploaded all files');
    this.uploadedFiles = [];
    this.fieldUpload.clear();
    this.uploadDialog = false;
    // Needs to be updated so the file service returns errors and messages and then load on sucussfull upload
    setTimeout(() => {
      this.loadFolder(this.updateService.getURI());
    }, 2000);
    setTimeout(() => {
      this.loadFolder(this.updateService.getURI());
    }, 2000);
    setTimeout(() => {
      this.loadFolder(this.updateService.getURI());
    }, 2000);
  }

}
