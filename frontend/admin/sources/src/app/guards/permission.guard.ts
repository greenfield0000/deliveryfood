import { AppRouteService } from './../services/app-route-service/app-route.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private appRouter: AppRouteService) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token: string = localStorage.getItem('token');
    if (!token || token && token.length === 0) {
      this.appRouter.goTo('/auth');
      return false;
    }
    return true;
  }
}
