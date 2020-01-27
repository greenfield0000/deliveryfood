import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveForm } from 'src/app/classes/reactive-form';
import { Address } from 'src/app/classes/address/address.class';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AccountEntity } from 'src/app/classes/accountEntity';
import { User } from 'src/app/classes/user';
import { AccountRole } from '../registy-stepper/registry-stepper.component';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

/**
 * Компонент для редактирования персональной информации пользователя системы
 */
@Component({
  selector: 'person-info-editor',
  templateUrl: './person-info-editor.component.html',
  styleUrls: ['./person-info-editor.component.scss']
})
export class PersonInfoEditorComponent extends ReactiveForm implements OnInit {

  @Input()
  public user: User = new User();
  @Output()
  public onChangeUser = new EventEmitter<User>();
  public personInfoFormGroup: FormGroup;

  public address: Address = new Address();
  public accountRoles: any[] = [
    { viewValue: 'Бармен', id: AccountRole.BARMEN },
    { viewValue: 'Официант', id: AccountRole.WAITER }
  ];

  protected registrySubscription(): void {
    throw new Error('Method not implemented.');
  }

  constructor(private _formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.personInfoFormGroup = this._formBuilder.group({
      accountRole: this.accountRoles,
      id: [this.user.$id],
      name: [this.user.$name, Validators.required],
      surName: [this.user.$surName, Validators.required],
      lastName: [this.user.$lastName, Validators.required],
      birthDay: [this.user.$birthDay, Validators.required],
      phone: [this.user.$phone, Validators.required],
      email: [this.user.$email, Validators.required]
    });

    // Публикация любого изменения на форме
    this.personInfoFormGroup.valueChanges.subscribe((userValueChanges: FormControl) => {
      this.user = new User(userValueChanges);
      this.onChangeUser.emit(this.user);
    });
  }

}
