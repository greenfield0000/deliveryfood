import { AccountEntity } from 'src/app/classes/accountEntity';
import { HttpConstant } from '../../constants/http-constant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/interfaces/auth';
import { RouteConstant } from 'src/app/constants/route-constant';
import { Router } from '@angular/router';

/**
 * Сервис авторизации и регистрации пользователей в системе
 */
@Injectable({
  providedIn: 'root'
})
export class AuthServiceImpl implements Auth {

  constructor(private _httpService: HttpClient,
    private router: Router) { }

  /**
   * Выйти из системы
   */
  signOut(accountEntity: AccountEntity, url?: string): Observable<any> {
    if (!url) {
      url = RouteConstant.auth_location + '/logout';
    }
    return this._httpService.post(url, accountEntity, HttpConstant.HTTP_OPTIONS);
  }

  /**
   * Войти в систему
   */
  signIn(accountEntity: AccountEntity, url?: string): Observable<any> {
    if (!url) {
      url = RouteConstant.auth_location + '/login';
    }
    return this._httpService.post<AccountEntity>(url, accountEntity, HttpConstant.HTTP_OPTIONS);
  }

  /**
   * Зарегистрироваться в системе
   */
  registry(accountEntity: AccountEntity, url?: string): Observable<AccountEntity> {
    if (!url) {
      url = RouteConstant.auth_location + '/registry';
    }
    return this._httpService.post<AccountEntity>(url, accountEntity, HttpConstant.HTTP_OPTIONS);
  }

}
