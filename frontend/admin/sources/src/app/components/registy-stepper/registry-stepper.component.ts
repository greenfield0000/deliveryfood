import { ReactiveForm } from './../../classes/reactive-form';
import { Address } from '../../classes/address/address.class';
import { AccountEntity } from './../../classes/accountEntity';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import * as clientAgreement from '../../json/registry-stepper-agreement.json';
import { AppRouteService } from 'src/app/services/app-route-service/app-route.service';
import { AppAccountContextService } from 'src/app/services/app-account-context-service/app-account-context.service';
import { User } from 'src/app/classes/user';

// временная константа хранения справочника типов учетных записей
// тип взят с сервисов
export enum AccountRole {
  // Официант
  WAITER = 5,
  // Бармен
  BARMEN = 6
}

@Component({
  selector: 'app-registry-stepper',
  templateUrl: './registry-stepper.component.html',
  styleUrls: ['./registry-stepper.component.scss'],
  providers: [
    {
      provide: MAT_STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: true, showError: true }
    }
  ]
})
export class RegistryStepperComponent extends ReactiveForm implements OnInit {

  // флаг, отвечающий за свойство степпера (true - возможно переходить только
  // из шага в шаг, false - в любом порядке)
  public isLinear = false;
  // Форм группы для валидаций и тд.
  public accountDataFormGroup: FormGroup;
  public personalDataFormGroup: FormGroup;
  public addressDataFormGroup: FormGroup;
  public fourFormGroup: FormGroup;
  // вставка пользовательского соглашения
  public agreementHTML: string;
  public isAgree: boolean = false;
  public accountRoles: any[] = [
    { viewValue: 'Бармен', id: AccountRole.BARMEN },
    { viewValue: 'Официант', id: AccountRole.WAITER }
  ];

  @Input()
  public account: AccountEntity = new AccountEntity();
  // функция возврата из степпера
  @Input()
  public goBackFn: Function = (() => {
    console.log('function goBack not implemented');
  });
  // функция для продолжения работы
  @Input()
  private goNextFn: Function = (() => {
    console.log('function goNext not implemented');
  });

  // основные аттрибуты для групп
  private passwordRepeat: string = '';
  private user = this.account && this.account.$user || new User();
  public address: Address = new Address();

  constructor(public router: AppRouteService, protected _appAccount: AppAccountContextService,
    protected _formBuilder: FormBuilder) { super(); }

  ngOnInit() {
    this.accountDataFormGroup = this._formBuilder.group({
      accountRole: this.accountRoles,
      nickName: [this.account.$nickName, Validators.required],
      login: [this.account.$login, Validators.required],
      password: [this.account.$password, Validators.required],
      passwordRepeat: [this.passwordRepeat, Validators.required]
    });
    this.personalDataFormGroup = this._formBuilder.group({
      name: [this.user.$name, Validators.required],
      surName: [this.user.$surName, Validators.required],
      lastName: [this.user.$lastName, Validators.required],
      birthDay: [this.user.$birthDay, Validators.required],
      phone: [this.user.$phone, Validators.required],
      email: [this.user.$email, Validators.required]
    });

    this.fourFormGroup = this._formBuilder.group({
      isAgree: this.isAgree
    });

    this.agreementHTML = <string>clientAgreement.agreement;
    this.registrySubscription();
  }

  /**
   * Метод регистрации подписок формы
   */
  protected registrySubscription(): void {
    // регистрация подписки на изменения значений
    this.accountDataFormGroup.valueChanges.subscribe(accountData => this.account = new AccountEntity(accountData));
    this.personalDataFormGroup.valueChanges.subscribe(userData => this.user = new User(userData));
    this.fourFormGroup.get('isAgree').valueChanges.subscribe(isAgree => this.isAgree = isAgree);
  }

  onSubmit() {
    if (!this.user.$addressList.includes(this.address)) {
      this.user.$addressList.push(this.address);
    }
    this.account.$user = this.user;
    this._appAccount.setAccount(this.account);
    this.goNextFn(this.router);
  }

}
