import { JournalComponent } from '../../../../../components/journal/journal.component';
import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { IJournal } from 'src/app/components/journal/journal.interface';
import { AppRouteService } from 'src/app/services/app-route-service/app-route.service';
import { ModalWindowService } from 'src/app/services/modal-window-service/modal-window.service';
import { IDialogType } from 'src/app/services/modal-window-service/idialog.type';
import { DialogComponent } from 'src/app/components/modal-window/common/dialog/dialog.component';
import { PersonalService } from '../personal.service';
import { AccountEntity } from 'src/app/classes/accountEntity';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit, IJournal {
  @HostBinding('class')
  private className = 'form';

  @ViewChild('journal') journal: JournalComponent;
  readonly journalSysName: string = 'Personals-jrnl';

  public readonly journalHeader: string = 'Журнал "Персонал"';

  constructor(private _personalService: PersonalService,
    private _appRouteService: AppRouteService,
    private _modalWindowService: ModalWindowService) { }

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
  public createNewPerson(selectedRow: any, context: IJournal) {
    const localContext: PersonalComponent = <PersonalComponent>context;
    localContext._personalService.$user = new User();
    localContext._appRouteService.goTo('dashbord/personal/add');
  }

  /**
   * Редактирование текущего пользователя
   * @param selectedRow выбранная запись в сетке данных
   * @param appRouteService роутер для перехода на другие страницы
   */
  public editPerson(selectedRow: any, context: IJournal) {
    const localContext: PersonalComponent = <PersonalComponent>context;
    if (!selectedRow) {
      localContext._modalWindowService.openDialog(IDialogType.WARN, DialogComponent, {
        message: 'Не выбрана строка журнала'
      });
      return;
    }
    localContext._personalService.$user = new User(selectedRow);
    localContext._appRouteService.goTo('dashbord/personal/edit');
  }

  /**
   * Удаление пользователя
   * @param selectedRow выбранная запись в сетке данных
   * @param appRouteService роутер для перехода на другие страницы
   */
  public deletePerson(selectedRow: any, context: IJournal) {
    const localContext: PersonalComponent = <PersonalComponent>context;
    if (!selectedRow) {
      localContext._modalWindowService.openDialog(IDialogType.WARN, DialogComponent, {
        message: 'Не выбрана строка журнала'
      });
      return;
    }
    console.log('New realisation deletePerson ', selectedRow);
  }



}


