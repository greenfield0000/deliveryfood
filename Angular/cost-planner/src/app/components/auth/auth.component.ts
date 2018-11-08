import { AuthFormData } from './../../classes/auth-formdata';
import { Component, OnInit, OnDestroy, Inject, Injector } from '@angular/core';
import { AuthServiceImpl } from 'src/app/services/auth-service/auth-service-impl.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit, OnDestroy {

  private _authFormData: AuthFormData;
  private _subscription: Subscription;

  constructor(private _authServiceImpl:  AuthServiceImpl) {}

  public signIn() {
    this._subscription = this._authServiceImpl.signIn(this._authFormData).subscribe((response: any) => {
      console.log(response);
    });
  }

  /**
   * Getter authFormData
   */
  public get authFormData(): AuthFormData {
    return this._authFormData;
  }

  /**
   * Setter authFormData
   */
  public set authFormData(value: AuthFormData) {
    this._authFormData = value;
  }

  ngOnInit() {
    this._authFormData = new AuthFormData();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
