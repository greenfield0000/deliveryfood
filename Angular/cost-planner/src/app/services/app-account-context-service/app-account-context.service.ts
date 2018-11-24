import { AppRouteService } from './../app-route-service/app-route.service';
import { AccountEntity } from './../../classes/accountEntity';
import { AuthServiceImpl } from 'src/app/services/auth-service/auth-service-impl.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppAccountContextService {

  // сущность на контекст приложения
  private _accountEntity: AccountEntity;

  constructor(private _authService: AuthServiceImpl,
    private temp: AppRouteService) {
    this._accountEntity = new AccountEntity();
  }

  regitry() {
    this._authService.registry(this._accountEntity)
      .subscribe((res: AccountEntity) => res ? this._accountEntity = res : null);
  }

  login() {
    this._authService.signIn(this._accountEntity)
      .subscribe((res: any) => {
        console.log(res);
        if (res && res.isAuthtorise) {
          this.temp.goTo('/dashbord');
        }
      });
  }

  logOut() {
    this._authService.signOut(this._accountEntity)
      .subscribe((res: AccountEntity) => res ? this._accountEntity = res : null);
    this._accountEntity = new AccountEntity();
    this.temp.goTo('/');
  }

  getAccountEntity(): AccountEntity {
    return this._accountEntity;
  }
}
