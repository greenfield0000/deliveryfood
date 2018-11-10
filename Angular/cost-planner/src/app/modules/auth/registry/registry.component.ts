import { AccountEntity } from 'src/app/classes/accountEntity';
import { AppAccountContextService } from './../../../services/app-account-context-service/app-account-context.service';
import { AppRouteService } from './../../../services/app-route-service/app-route.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.sass']
})
export class RegistryComponent implements OnInit {

  constructor(
    private _appAccount: AppAccountContextService,
    private _router: AppRouteService) { }

  public backToLoginForm() {
    this._router.goTo('auth/login');
  }

  public registry() {
    this._appAccount.regitry();
  }

  ngOnInit() {
  }

  public get accountEntity(): AccountEntity {
    return this._appAccount.getAccountEntity();
  }

}
