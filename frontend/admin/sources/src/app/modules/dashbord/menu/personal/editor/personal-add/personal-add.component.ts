import { Component, OnInit } from '@angular/core';
import { AppRouteService } from 'src/app/services/app-route-service/app-route.service';

@Component({
  selector: 'personal-add',
  templateUrl: './personal-add.component.html',
  styleUrls: ['./personal-add.component.scss']
})
export class PersonalAddComponent implements OnInit {

  constructor(private _appRouterService: AppRouteService) { }

  ngOnInit() {
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
