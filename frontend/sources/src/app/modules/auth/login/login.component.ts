import { AccountEntity } from './../../../classes/accountEntity';
import { AppAccountContextService } from './../../../services/app-account-context-service/app-account-context.service';
import { AppRouteService } from './../../../services/app-route-service/app-route.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private account: AccountEntity = this._appAccount.getAccount();

  constructor(
    private _appAccount: AppAccountContextService,
    private _router: AppRouteService
  ) { }

  /**
   * Войти
   */
  public signIn() {
    this._appAccount.login();
  }

  public registry() {
    this._router.goTo('/auth/registry');
  }

  ngOnInit() {
  }
}
