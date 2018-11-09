import { Account } from './../../interfaces/account';
import { HttpConstant } from '../../constants/http-constant';
import { AuthFormData } from '../../classes/auth-formdata';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/interfaces/auth-service';
import { Observable } from 'rxjs';

/**
 * Сервис авторизации и регистрации пользователей в системе
 */
@Injectable()
export class AuthServiceImpl implements Account {
  private _isAuthtorise: boolean;

  constructor(private _httpService: HttpClient) { }

  /**
   * Выйти из системы
   */
  signOut(authFormData: AuthFormData, url?: string): Observable<any> {
    const body = JSON.stringify(authFormData);
    return this._httpService.post(url, body, HttpConstant.HTTP_OPTIONS);
  }

  /**
   * Войти в систему
   */
  signIn(authFormData: AuthFormData, url?: string): Observable<any> {
    console.log('Try to post ', authFormData);
    const body = JSON.stringify(authFormData);
    return this._httpService.post(url, body, HttpConstant.HTTP_OPTIONS);
  }

  /**
   * Зарегистрироваться в системе
   */
  registry(authFormData: AuthFormData, url?: string): Observable<any> {
    const body = JSON.stringify(authFormData);
    return this._httpService.post(url, body, HttpConstant.HTTP_OPTIONS);
  }

  isAuthtorise(): boolean {
    return this._isAuthtorise;
  }

}
