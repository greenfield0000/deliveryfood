import { Account } from './../../interfaces/account';
import { AuthServiceImpl } from './../auth-service/auth-service-impl.service';
import { AppRouteService } from './../app-route-service/app-route.service';
import { AccountEntity } from './../../classes/accountEntity';
import { Injectable } from '@angular/core';
import { SimpleResult } from 'src/app/utils/simple-result.class';
import { Observable, from, of } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';

@Injectable({
  providedIn: 'root'
})
export class AppAccountContextService {

  // сущность на контекст приложения
  private _account: AccountEntity = new AccountEntity();

  constructor(private _authService: AuthServiceImpl,
    private temp: AppRouteService) {
  }

  regitry(): Observable<SimpleResult<AccountEntity>> {
    return this._authService.registry(this._account);
  }

  login(loginData: any) {
    this._authService.signIn(loginData)
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

  setAccount(account: AccountEntity) {
    this._account = account;
  }
}
