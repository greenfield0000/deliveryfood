import { IDialog } from 'src/app/services/modal-window-service/idialog';
import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay/index';
import { Subscription } from 'rxjs';
import { IDialogType } from './idialog.type';

@Injectable({
  providedIn: 'root'
})
export class ModalWindowService implements OnDestroy {

  private subscriptions: Array<Subscription> = new Array();
  private dialogComponent: IDialog;

  constructor(public dialog: MatDialog) { }

  openDialog(type: IDialogType, dialogComponent: ComponentType<IDialog>, data?: any): void {
    data = data ? data : {};
    this.dialogComponent = dialogComponent.prototype;
    this.dialogComponent.type = type;
    const dialogRef = this.dialog.open(dialogComponent, data);

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    }));
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
  }

}
