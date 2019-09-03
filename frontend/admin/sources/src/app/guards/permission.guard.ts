import { AccountEntity } from './../classes/accountEntity';
import { AppRouteService } from './../services/app-route-service/app-route.service';
import { AppAccountContextService } from './../services/app-account-context-service/app-account-context.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private appAccountContextService: AppAccountContextService,
    private appRouter: AppRouteService) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const account: AccountEntity = this.appAccountContextService.getAccount();
    if (!account || !account.$authtorised) {
      this.appRouter.goTo('/auth');
      return false;
    }

    return true;
  }
}
