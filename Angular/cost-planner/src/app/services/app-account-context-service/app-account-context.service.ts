import { AppRouteService } from './../app-route-service/app-route.service';
import { AccountEntity } from './../../classes/accountEntity';
import { AuthServiceImpl } from 'src/app/services/auth-service/auth-service-impl.service';
import { Injectable } from '@angular/core';
import { Account } from './../../interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class AppAccountContextService implements Account {

  // сущность на контекст приложения
  private _accountEntity: AccountEntity;

  constructor(private _authService: AuthServiceImpl,
    private temp: AppRouteService) {
    this._accountEntity = new AccountEntity();
  }

  regitry() {
    this._authService.registry(this._accountEntity)
      .subscribe((res: AccountEntity) => res ? this._accountEntity = res : null)
      .unsubscribe();
  }

  login() {
    this._authService.signIn(this._accountEntity)
      .subscribe((res: AccountEntity) => res ? this._accountEntity = res : null)
      .unsubscribe();


    this._accountEntity = new AccountEntity(
      this._accountEntity.login,
      this._accountEntity.password,
      true
    );
    this.temp.goTo('dashbord');
  }

  logOut() {
    this._authService.signOut(this._accountEntity)
      .subscribe((res: AccountEntity) => res ? this._accountEntity = res : null)
      .unsubscribe();
  }

  isAuthtorise(): boolean {
    return this._accountEntity.isAuthtorise();
  }

  getAccountEntity(): AccountEntity {
    return this._accountEntity;
  }
}
