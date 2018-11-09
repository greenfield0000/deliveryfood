import { AuthFormData } from '../../../classes/auth-formdata';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthServiceImpl } from 'src/app/services/auth-service/auth-service-impl.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {

  private _authFormData: AuthFormData;
  private _subscription: Subscription;

  constructor(
    private _authServiceImpl: AuthServiceImpl
  ) { }

  /**
   * Войти
   */
  public signIn() {
    this._subscription = this._authServiceImpl.signIn(this._authFormData).subscribe((response: any) => {
      console.log(response);
    });
  }

  public registry() {
    // this._location.params.source.map('auth /registry');
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
