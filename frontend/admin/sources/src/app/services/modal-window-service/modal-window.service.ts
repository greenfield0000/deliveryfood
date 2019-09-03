import { IDialog } from 'src/app/services/modal-window-service/idialog';
import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay/index';
import { Subscription, Observable } from 'rxjs';
import { IDialogType } from './idialog.type';

@Injectable({
  providedIn: 'root'
})
export class ModalWindowService implements OnDestroy {

  private subscriptions: Array<Subscription> = new Array();
  private dialogComponent: IDialog;
  private windowWidthPX: string = '800';
  private windowHeightPX: string = '500';

  constructor(public dialog: MatDialog) { }

  openDialog(type: IDialogType, dialogComponent: ComponentType<IDialog>, dataContext?: any): Observable<any> {
    dataContext = dataContext ? dataContext : {};
    this.dialogComponent = dialogComponent.prototype;
    this.dialogComponent.type = type;
    const dialogRef = this.dialog.open(dialogComponent, {
      data: dataContext,
      maxWidth: this.windowWidthPX,
      maxHeight: this.windowHeightPX,
      width: this.windowWidthPX,
      height: this.windowWidthPX
    });

    const closed: Observable<any> = dialogRef.afterClosed();
    this.subscriptions.push(closed.subscribe(result => {
      console.log('The dialog was closed');
    }));

    return closed;
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
  }

}
