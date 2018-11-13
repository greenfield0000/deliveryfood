import { AccountEntity } from './../../../classes/accountEntity';
import { AppAccountContextService } from './../../../services/app-account-context-service/app-account-context.service';
import { AppRouteService } from './../../../services/app-route-service/app-route.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    private _appAccount: AppAccountContextService,
    private _router: AppRouteService
  ) { }

  /**
   * Войти
   */
  public signIn() {
    console.log('signIn');
    this._appAccount.login();
  }

  public registry() {
    this._router.goTo('auth/registry');
  }

  public get accountEntity(): AccountEntity {
    return this._appAccount.getAccountEntity();
  }

  ngOnInit() {
  }
}
