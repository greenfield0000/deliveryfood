import { Component, Injector } from '@angular/core';
import { IJournal } from 'src/app/components/journal/journal.interface';
import { IDialogType } from 'src/app/services/modal-window-service/idialog.type';
import { DialogComponent } from 'src/app/components/modal-window/common/dialog/dialog.component';
import { User } from 'src/app/classes/user';
import { SimpleResult } from 'src/app/utils/simple-result.class';
import { environment } from 'src/environments/environment';
import { AbstractJournalMenu } from '../../abstract-journal-menu';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent extends AbstractJournalMenu<PersonalComponent> {
  
  
  getJournalHeader(): string {
    return "Журнал персонала";
  }

  getJournalSysName(): string {
    return "Personals-jrnl";
  }

  getComponentContext(): PersonalComponent {
    return this;
  }

  constructor(protected serviceInjector: Injector) {
    super(serviceInjector);
  }

  /**
   * Создание нового пользователя
   * @param selectedRow выбранная запись в сетке данных
   * @param appRouteService роутер для перехода на другие страницы
   */
  public createNewPerson(context: IJournal<PersonalComponent>) {
    const localContext: PersonalComponent = <PersonalComponent>context;
    localContext._personalService.$user = new User();
    localContext._appRouterService.goTo('dashbord/personal/add');
  }

  /**
   * Редактирование текущего пользователя
   * @param selectedRow выбранная запись в сетке данных
   * @param appRouteService роутер для перехода на другие страницы
   */
  public editPerson(selectedRow: any, context: IJournal<PersonalComponent>) {
    selectedRow = selectedRow && selectedRow[0] || selectedRow;
    const localContext: PersonalComponent = context.getComponentContext();
    if (!selectedRow) {
      localContext._modalWindowService.openDialog(IDialogType.WARN, DialogComponent, {
        message: 'Не выбрана строка журнала'
      });
      return;
    }
    localContext._personalService.$user = new User(selectedRow);
    localContext._appRouterService.goTo('dashbord/personal/edit');
  }

  /**
   * Удаление пользователя
   * @param selectedRow выбранная запись в сетке данных
   * @param appRouteService роутер для перехода на другие страницы
   */
  public deletePerson(selectedRow: any, context: IJournal<PersonalComponent>) {
    selectedRow = selectedRow && selectedRow[0] || selectedRow;
    if (!selectedRow) {
      context.getComponentContext()._modalWindowService.openDialog(IDialogType.WARN, DialogComponent, {
        message: 'Не выбрана строка журнала'
      });
      return;
    }
    const localContext: PersonalComponent = context.getComponentContext();
    const queryParams = {
      buttonAction: 'delete',
      journalSysName: localContext.getJournalSysName(),
      entity: new User(selectedRow),
    };
    localContext._http.post<SimpleResult<User[]>>(environment.gatePath.journal_location + '/doButtonHandler', queryParams)
      .subscribe((result: SimpleResult<User[]>) => {
        localContext._journalService.refreshLoadData(result);
      });
    console.log('New realisation deletePerson ', selectedRow);
  }

}


