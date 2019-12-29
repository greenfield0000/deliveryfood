import { JournalComponent } from '../../../../../components/journal/journal.component';
import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { IJournal } from 'src/app/components/journal/journal.interface';
import { AppRouteService } from 'src/app/services/app-route-service/app-route.service';
import { ModalWindowService } from 'src/app/services/modal-window-service/modal-window.service';
import { IDialogType } from 'src/app/services/modal-window-service/idialog.type';
import { DialogComponent } from 'src/app/components/modal-window/common/dialog/dialog.component';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit, IJournal {
  @HostBinding('class')
  private get className(): string {
    return 'form';
  }
  @ViewChild('journal') journal: JournalComponent;
  readonly journalSysName: string = 'Personals-jrnl';

  public readonly journalHeader: string = 'Журнал "Персонал"';

  constructor() { }

  ngOnInit() {
    this.journal.load(this.journalSysName);
  }

  public getContext(): IJournal {
    return this;
  }

  /**
   * Создание нового пользователя
   * @param selectedRow выбранная запись в сетке данных
   * @param appRouteService роутер для перехода на другие страницы
   */
  public createNewPerson(selectedRow: any, appRouteService: AppRouteService) {
    appRouteService.goTo('dashbord/personal/add');
  }

  /**
   * Редактирование текущего пользователя
   * @param selectedRow выбранная запись в сетке данных
   * @param appRouteService роутер для перехода на другие страницы
   */
  public editPerson(selectedRow: any, appRouteService: AppRouteService, modalWindowService: ModalWindowService) {
    if (!selectedRow) {
      modalWindowService.openDialog(IDialogType.WARN, DialogComponent, {
        message: 'Не выбрана строка журнала'
      });
      return;
    }
    appRouteService.goTo('dashbord/personal/edit');
  }

  /**
   * Удаление пользователя
   * @param selectedRow выбранная запись в сетке данных
   * @param appRouteService роутер для перехода на другие страницы
   */
  public deletePerson(selectedRow: any, appRouteService: AppRouteService, modalWindowService: ModalWindowService) {
    if (!selectedRow) {
      modalWindowService.openDialog(IDialogType.WARN, DialogComponent, {
        message: 'Не выбрана строка журнала'
      });
      return;
    }
    console.log('New realisation deletePerson ', selectedRow);
  }



}


