import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MainSideNavService {

  private _drawer: MatDrawer;

  constructor() { }

  public getDriwer(): MatDrawer {
    return this._drawer;
  }

  public setDriwer(drawer: MatDrawer) {
    this._drawer = drawer;
  }

  public drawerToggle() {
    this._drawer.toggle();
  }
}
