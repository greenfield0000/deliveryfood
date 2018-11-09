import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceImpl } from 'src/app/services/auth-service/auth-service-impl.service';
import { Subscription } from 'rxjs';
import { AuthFormData } from 'src/app/classes/auth-formdata';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.sass']
})
export class RegistryComponent implements OnInit, OnDestroy {

  private _authFormData: AuthFormData;
  private _subscription: Subscription;

  constructor(
    private _authServiceImpl: AuthServiceImpl,
    private _router: Router) { }

  public goBack () {
    this._router.navigateByUrl('/auth');
  }

  public registry() {
    console.log('Try to registry');
    this._subscription = this._authServiceImpl.signIn(this._authFormData).subscribe((response: any) => {
      console.log(response);
    });
  }

  ngOnInit() {
    this._authFormData = new AuthFormData();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }


}
