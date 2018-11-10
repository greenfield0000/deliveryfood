import { AccountEntity } from 'src/app/classes/accountEntity';
import { HttpConstant } from '../../constants/http-constant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/interfaces/auth';

/**
 * Сервис авторизации и регистрации пользователей в системе
 */
@Injectable({
  providedIn: 'root'
})
export class AuthServiceImpl implements Auth {

  constructor(private _httpService: HttpClient) { }

  /**
   * Выйти из системы
   */
  signOut(accountEntity: AccountEntity, url?: string): Observable<AccountEntity> {
    return this._httpService.post<AccountEntity>(url, accountEntity, HttpConstant.HTTP_OPTIONS);
  }

  /**
   * Войти в систему
   */
  signIn(accountEntity: AccountEntity, url?: string): Observable<AccountEntity> {
    console.log('Try to post ', accountEntity);
    return this._httpService.post<AccountEntity>(url, accountEntity, HttpConstant.HTTP_OPTIONS);
  }

  /**
   * Зарегистрироваться в системе
   */
  registry(accountEntity: AccountEntity, url?: string): Observable<AccountEntity> {
    return this._httpService.post<AccountEntity>(url, accountEntity, HttpConstant.HTTP_OPTIONS);
  }

}
