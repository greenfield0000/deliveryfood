import { Injectable } from '@angular/core';
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private user: User = new User();

  constructor() { }

  /**
   * Установка пользователя
   */
  public set $user(user: User) {
    this.user = user;
  }

  /**
   * Получение пользователя
   */
  public get $user(): User {
    return this.user;
  }
}
