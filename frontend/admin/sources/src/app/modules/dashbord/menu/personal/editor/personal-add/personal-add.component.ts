import { JournalService } from './../../../../../../services/journal-service/journal.service';
import { HttpService } from './../../../../../../services/http-service/http.service';
import { Component, OnInit } from '@angular/core';
import { AppRouteService } from 'src/app/services/app-route-service/app-route.service';
import { PersonalService } from '../../personal.service';
import { AccountEntity } from 'src/app/classes/accountEntity';
import { User } from 'src/app/classes/user';
import { SimpleResult } from 'src/app/utils/simple-result.class';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'personal-add',
  templateUrl: './personal-add.component.html',
  styleUrls: ['./personal-add.component.scss']
})
export class PersonalAddComponent implements OnInit {

  private user: User;

  constructor(private _appRouterService: AppRouteService,
    private _personalService: PersonalService,
    private _http: HttpService,
    private _journalService: JournalService) { }

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
   * Обработчик кнопки "Сохранить изменения". Сохраняет изменяемые данные
   */
  public save() {
    this._http.post<SimpleResult<User[]>>(
      environment.gatePath.journal_location + '/doButtonHandler', {
      buttonAction: 'create'
    })
      .subscribe((result: SimpleResult<User[]>) => {
        this._journalService.refreshLoadData(result);
      });
  }

}
