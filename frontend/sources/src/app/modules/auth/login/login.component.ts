import { KladrService } from 'src/app/services/kladr-service/kladr.service';

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

  private login: string;
  private password: string;

  constructor(
    private _appAccount: AppAccountContextService,
    private _router: AppRouteService,
    private kladr: KladrService
  ) { }

  /**
   * Войти
   */
  public signIn() {
    this._appAccount.login({
      login: this.login,
      password: this.password
    });
  }

  public registry() {
    this._router.goTo('/auth/registry');
  }

  ngOnInit() {
  }

  public a() {
    this.kladr.loadRegion('Я').subscribe(res => {
      console.log(res);
    });

  }

  public b() {
    console.log('b' + this.kladr.loadDistrict('Рыби', 1));
  }

  public c() {
    console.log('c' + this.kladr.loadCity('Рыби', 1));
  }

  public d() {
    console.log('d' + this.kladr.loadStreet('Рыби', 1));
  }

  public e() {
  }

}
