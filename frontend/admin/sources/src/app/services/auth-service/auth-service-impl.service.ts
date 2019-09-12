import { environment } from 'src/environments/environment';
import { AccountEntity } from 'src/app/classes/accountEntity';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/interfaces/auth';
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
      url = environment.gatePath.auth_location + '/logout';
    }
    return this._httpService.post<SimpleResult<AccountEntity>>(url, accountEntity, environment.headers);
  }

  /**
   * Войти в систему
   */
  signIn(accountEntity: AccountEntity, url?: string): Observable<SimpleResult<AccountEntity>> {
    if (!url) {
      url = environment.gatePath.auth_location + '/login';
    }
    return this._httpService.post<SimpleResult<AccountEntity>>(url, JSON.stringify(accountEntity), environment.headers);
  }

  /**
   * Зарегистрироваться в системе
   */
  registry(accountEntity: AccountEntity, url?: string): Observable<SimpleResult<AccountEntity>> {
    if (!url) {
      url = environment.gatePath.auth_location + '/registry';
    }
    return this._httpService.post<SimpleResult<AccountEntity>>(url, JSON.stringify(accountEntity), environment.headers);
  }

}
