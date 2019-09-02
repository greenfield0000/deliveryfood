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
  public message: string = `
  Название горы берёт начало из языка суахили и предположительно означает «гора, которая сверкает».
  Однако точное происхождение названия Килиманджаро неизвестно. На этот счёт существует несколько теорий[3].
  `;
  public type: IDialogType;

  constructor(private dialogRef: MatDialogRef<IDialog>, @Inject(MAT_DIALOG_DATA) data) { }

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
