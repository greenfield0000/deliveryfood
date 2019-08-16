import { AccountEntity } from 'src/app/classes/accountEntity';
import { AppAccountContextService } from './../../../services/app-account-context-service/app-account-context.service';
import { AppRouteService } from './../../../services/app-route-service/app-route.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistryStepperComponent } from 'src/app/components/registy-stepper/registry-stepper.component';
import { SimpleResult } from 'src/app/utils/simple-result.class';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent extends RegistryStepperComponent implements OnInit {

  constructor() {
    super(Inject(AppRouteService), Inject(AppAccountContextService), Inject(FormBuilder));
  }

  public backToLoginForm(appRouter: AppRouteService) {
    if (appRouter) {
      appRouter.goTo('/auth/login');
    }
  }

  public registryAndLogin() {
    this._appAccount.regitry()
      .subscribe((result: SimpleResult<AccountEntity>) => {
        if (result) {
          const account: AccountEntity = new AccountEntity(result.result);
          if (account) {
            this._appAccount.login(account);
          }
        }
      });
  }

  ngOnInit() { }
}
