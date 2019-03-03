import { AccountEntity } from 'src/app/classes/accountEntity';
import { AppAccountContextService } from './../../../services/app-account-context-service/app-account-context.service';
import { AppRouteService } from './../../../services/app-route-service/app-route.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  private account: AccountEntity = this._appAccount.getAccount();

  constructor(
    private _appAccount: AppAccountContextService,
    private _router: AppRouteService,
    private _formBuilder: FormBuilder) { }

  public backToLoginForm() {
    this._router.goTo('/auth/login');
  }

  public registry() {
    this._appAccount.regitry();
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
