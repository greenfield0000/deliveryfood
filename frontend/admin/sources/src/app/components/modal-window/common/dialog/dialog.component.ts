import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDialog } from 'src/app/services/modal-window-service/idialog';
import { IDialogType } from 'src/app/services/modal-window-service/idialog.type';

@Component({
  selector: 'dialog-info',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DialogComponent implements OnInit, IDialog {

  public description: string = 'Описание';
  public type: IDialogType;
  public data: any = { message: '' };

  constructor(private dialogRef: MatDialogRef<IDialog>, @Inject(MAT_DIALOG_DATA) data: any) {
    if (data) {
      this.data = data;
    }
  }

  ngOnInit() {
    const componentInfo: IDialog = this.dialogRef.componentInstance;
    if (componentInfo) {
      this.type = componentInfo.type;
      switch (this.type) {
        case IDialogType.INFO: {
          this.description = 'Информация';
          break;
        }
        case IDialogType.CONFIRM: {
          this.description = 'Вы уверены ?';
          break;
        }
        case IDialogType.ERROR: {
          this.description = 'Ошибка !';
          break;
        }
        case IDialogType.WARN: {
          this.description = 'Предупреждение !';
          break;
        }
      }
    }
  }

  public close() {
    this.dialogRef.close();
  }

  public save() {
    this.dialogRef.close();
  }
}
