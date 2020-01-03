import { JournalComponent } from '../../../../../components/journal/journal.component';
import { Component, OnInit, ViewChild, HostBinding, Injector } from '@angular/core';
import { IJournal } from 'src/app/components/journal/journal.interface';
import { AppRouteService } from 'src/app/services/app-route-service/app-route.service';
import { ModalWindowService } from 'src/app/services/modal-window-service/modal-window.service';
import { IDialogType } from 'src/app/services/modal-window-service/idialog.type';
import { DialogComponent } from 'src/app/components/modal-window/common/dialog/dialog.component';
import { PersonalService } from '../personal.service';
import { AccountEntity } from 'src/app/classes/accountEntity';
import { User } from 'src/app/classes/user';
import { HttpService } from 'src/app/services/http-service/http.service';
import { JournalService } from 'src/app/services/journal-service/journal.service';
import { SimpleResult } from 'src/app/utils/simple-result.class';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit, IJournal<PersonalComponent> {

  @HostBinding('class')
  private className = 'form';

  @ViewChild('journal') journal: JournalComponent<PersonalComponent>;
  protected readonly journalSysName: string = 'Personals-jrnl';

  public readonly journalHeader: string = 'Журнал "Персонал"';

  protected _appRouterService: AppRouteService;
  protected _personalService: PersonalService;
  protected _http: HttpService;
  protected _journalService: JournalService;
  protected _modalWindowService: ModalWindowService;

  constructor(protected serviceInjector: Injector) {
    this._appRouterService = this.serviceInjector.get(AppRouteService);
    this._personalService = this.serviceInjector.get(PersonalService);
    this._http = this.serviceInjector.get(HttpService);
    this._journalService = this.serviceInjector.get(JournalService);
    this._modalWindowService = this.serviceInjector.get(ModalWindowService);
  }

  ngOnInit() {
    this.journal.load(this.journalSysName);
  }


  /**
   * Создание нового пользователя
   * @param selectedRow выбранная запись в сетке данных
   * @param appRouteService роутер для перехода на другие страницы
   */
  public createNewPerson(selectedRow: any, context: IJournal<PersonalComponent>) {
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

  getJournalSysName(): string {
    return this.journalSysName;
  }

  getComponentContext(): PersonalComponent {
    return this;
  }


}


