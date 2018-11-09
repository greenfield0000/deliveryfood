import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MainSideNavService {

  private _drawer: MatSidenav;

  constructor() { }

  public getDriwer(): MatSidenav {
    return this._drawer;
  }

  public setDriwer(drawer: MatSidenav) {
    this._drawer = drawer;
  }

  public drawerToggle() {
    this._drawer.toggle();
  }
}
