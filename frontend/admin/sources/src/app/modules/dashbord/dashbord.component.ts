import { AppAccountContextService } from 'src/app/services/app-account-context-service/app-account-context.service';
import { MenuService } from './../../services/menu-service/menu.service';
import { Component, OnInit } from '@angular/core';
import { ModalWindowService } from 'src/app/services/modal-window-service/modal-window.service';
import { IDialog } from 'src/app/services/modal-window-service/idialog';
import { DialogComponent } from 'src/app/components/modal-window/common/dialog/dialog.component';
import { IDialogType } from 'src/app/services/modal-window-service/idialog.type';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {

  constructor(private modalWindowService: ModalWindowService) { }
  ngOnInit() { }

  openDialog() {
    this.modalWindowService.openDialog(IDialogType.ERROR, DialogComponent);
  }

}
