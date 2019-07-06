import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MainSideNavService {

  private drawer: MatSidenav;

  constructor() { }

  public getDriwer(): MatSidenav {
    return this.drawer;
  }

  public setDriwer(drawer: MatSidenav) {
    this.drawer = drawer;
  }

  public drawerToggle() {
    this.drawer.toggle();
  }

  public open() {
    const isOpened: boolean = this.drawer && this.drawer.opened || true;
    if (isOpened) {
      this.drawer.toggle();
    }
  }

  public close() {
    const isOpened: boolean = this.drawer && this.drawer.opened || false;
    if (isOpened) {
      this.drawer.toggle();
    }
  }

}
