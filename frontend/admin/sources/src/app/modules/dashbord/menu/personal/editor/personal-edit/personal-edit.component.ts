import { Component, OnInit } from '@angular/core';
import { AppRouteService } from 'src/app/services/app-route-service/app-route.service';
import { AccountEntity } from 'src/app/classes/accountEntity';
import { PersonalService } from '../../personal.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'personal-edit',
  templateUrl: './personal-edit.component.html',
  styleUrls: ['./personal-edit.component.scss']
})
export class PersonalEditComponent implements OnInit {

  private user: User;

  constructor(private _appRouterService: AppRouteService,
    private _personalService: PersonalService) { }

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
    alert('Save stub!!!');
  }

}
