import { Account } from './../../interfaces/account';
import { AuthServiceImpl } from './../auth-service/auth-service-impl.service';
import { AppRouteService } from './../app-route-service/app-route.service';
import { AccountEntity } from './../../classes/accountEntity';
import { Injectable } from '@angular/core';
import { SimpleResult } from 'src/app/utils/simple-result.class';

@Injectable({
  providedIn: 'root'
})
export class AppAccountContextService {

  // сущность на контекст приложения
  private _account: AccountEntity = new AccountEntity();

  constructor(private _authService: AuthServiceImpl,
    private temp: AppRouteService) {
  }

  regitry() {
    this._authService.registry(this._account)
      .subscribe((simpleResult: SimpleResult<AccountEntity>) => (simpleResult && simpleResult.result) ?
        this._account = new AccountEntity(simpleResult.result) : new AccountEntity());
  }

  login() {
    this._authService.signIn(this._account)
      .subscribe((simpleResult: SimpleResult<AccountEntity>) => {
        const account: AccountEntity = simpleResult && simpleResult.result && new AccountEntity(simpleResult.result);
        if (account) {
          this._account = account;
          this.temp.goTo('/dashbord');
        }
      });
  }

  logOut() {
    this._authService.signOut(this._account)
      .subscribe((simpleResult: SimpleResult<AccountEntity>) => {
        this._account = (simpleResult && simpleResult.result) ? new AccountEntity(simpleResult.result) : new AccountEntity();
        this.temp.goTo('/');
      });
  }

  getAccount(): AccountEntity {
    return this._account || new AccountEntity();
  }
}
