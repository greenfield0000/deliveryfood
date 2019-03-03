import { AccountEntity } from './../../classes/accountEntity';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import * as clientAgreement from '../../json/registry-stepper-agreement.json';

@Component({
  selector: 'app-registry-stepper',
  templateUrl: './registry-stepper.component.html',
  styleUrls: ['./registry-stepper.component.scss'],
  providers: [
    {
      provide: MAT_STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class RegistryStepperComponent implements OnInit {
  // флаг, отвечающий за свойство степпера (true - возможно переходить только
  // из шага в шаг, false - в любом порядке)
  isLinear = false;
  // Форм группы для валидаций и тд.
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourFormGroup: FormGroup;
  // вставка пользовательского соглашения
  private agreementHTML: string;

  @Input()
  private account: AccountEntity = new AccountEntity();

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nickName: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      phone: ['', Validators.required],
      email: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({});

    this.fourFormGroup = this._formBuilder.group({
      isAgree: ['', Validators.required, Validators.requiredTrue]
    });

    this.agreementHTML = <string>clientAgreement.agreement;
  }

  form1() {
    console.log(this.firstFormGroup.value);
  }

  form2() {
    console.log(this.secondFormGroup.value);
  }

}
