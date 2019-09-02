import { AccountEntity } from 'src/app/classes/accountEntity';
import { HttpConstant } from '../../constants/http-constant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/interfaces/auth';
import { RouteConstant } from 'src/app/constants/route-constant';
import { Router } from '@angular/router';
import { SimpleResult } from 'src/app/utils/simple-result.class';
import { HttpService } from '../http-service/http.service';

/**
 * Сервис авторизации и регистрации пользователей в системе
 */
@Injectable({
  providedIn: 'root'
})
export class AuthServiceImpl implements Auth {

  constructor(private _httpService: HttpService) { }

  /**
   * Выйти из системы
   */
  signOut(accountEntity: AccountEntity, url?: string): Observable<SimpleResult<AccountEntity>> {
    if (!url) {
      url = RouteConstant.auth_location + '/logout';
    }
    return this._httpService.post<SimpleResult<AccountEntity>>(url, accountEntity, HttpConstant.HTTP_OPTIONS);
  }

  /**
   * Войти в систему
   */
  signIn(accountEntity: AccountEntity, url?: string): Observable<SimpleResult<AccountEntity>> {
    if (!url) {
      url = RouteConstant.auth_location + '/login';
    }
    return this._httpService.post<SimpleResult<AccountEntity>>(url, JSON.stringify(accountEntity), HttpConstant.HTTP_OPTIONS);
  }

  /**
   * Зарегистрироваться в системе
   */
  registry(accountEntity: AccountEntity, url?: string): Observable<SimpleResult<AccountEntity>> {
    if (!url) {
      url = RouteConstant.auth_location + '/registry';
    }
    return this._httpService.post<SimpleResult<AccountEntity>>(url, JSON.stringify(accountEntity), HttpConstant.HTTP_OPTIONS);
  }

}
