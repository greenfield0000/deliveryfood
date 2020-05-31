import { Component, OnInit, Injector } from '@angular/core';
import { User } from 'src/app/classes/user';
import { PersonalComponent } from '../../journal-page/personal.component';
import { SimpleResult } from 'src/app/utils/simple-result.class';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'personal-edit',
  templateUrl: './personal-edit.component.html',
  styleUrls: ['./personal-edit.component.scss']
})
export class PersonalEditComponent extends PersonalComponent implements OnInit {

  public user: User;

  constructor(protected serviceInjector: Injector) {
    super(serviceInjector);
  }

  ngOnInit() {
    this.user = this._personalService.$user;
  }


  /**
   * Обработчик кнопки "Вернуться". Возвращает с текущей страницы обратно в журнал
   */
  public back() {
    this._appRouterService.goTo('dashbord/personal');
  }

  /**
   * Обработчик кнопки "Сохранить изменения". ,Обновить изменяемые данные
   */
  public update() {
    console.log('User for update ', this.user);
    const queryParams = {
      buttonAction: 'update',
      journalSysName: this.getJournalSysName(),
      entity: this.user
    };
    this._http.post<SimpleResult<User[]>>(environment.gatePath.journal_location + '/doButtonHandler', queryParams)
      .subscribe((result: SimpleResult<User[]>) => {
        this._journalService.refreshLoadData(result);
      });
  }

  /**
   * Обработчик события изменения пользователя
   * @param changedUser пользователь с измененными данными
   */
  public onChangeUser(changedUser: User) {
    this.user = changedUser;
  }

}
