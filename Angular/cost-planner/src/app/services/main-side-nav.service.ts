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

  public setShowFilter(drawer: MatDrawer) {
    this._drawer = drawer;
  }
}
