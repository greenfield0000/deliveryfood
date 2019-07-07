import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MainSideNavService {

  private menuNavigatorDrawer: MatSidenav;
  private journalFilterDrawer: MatSidenav;

  constructor() { }

  /**
   * Getter $menuNavigatorDrawer
   * @return {MatSidenav}
   */
  public get $menuNavigatorDrawer(): MatSidenav {
    return this.menuNavigatorDrawer;
  }

  /**
   * Getter $journalFilterDrawer
   * @return {MatSidenav}
   */
  public get $journalFilterDrawer(): MatSidenav {
    return this.journalFilterDrawer;
  }

  /**
   * Setter $menuNavigatorDrawer
   * @param {MatSidenav} value
   */
  public set $menuNavigatorDrawer(value: MatSidenav) {
    this.menuNavigatorDrawer = value;
  }

  /**
   * Setter $journalFilterDrawer
   * @param {MatSidenav} value
   */
  public set $journalFilterDrawer(value: MatSidenav) {
    this.journalFilterDrawer = value;
  }

  public drawerToggle(drawer: MatSidenav) {
    drawer.toggle();
  }

  public menuNavigatorDrawerOpen() {
    const isOpened: boolean = this.menuNavigatorDrawer && this.menuNavigatorDrawer.opened || true;
    if (isOpened) {
      this.menuNavigatorDrawer.toggle();
    }
  }

  public menuNavigatorDrawerClose() {
    const isOpened: boolean = this.menuNavigatorDrawer && this.menuNavigatorDrawer.opened || false;
    if (isOpened) {
      this.menuNavigatorDrawer.toggle();
    }
  }

  public journalFilterDrawerOpen() {
    const isOpened: boolean = this.journalFilterDrawer && this.journalFilterDrawer.opened || true;
    if (isOpened) {
      this.journalFilterDrawer.toggle();
    }
  }

  public journalFilterDrawerClose() {
    const isOpened: boolean = this.journalFilterDrawer && this.journalFilterDrawer.opened || false;
    if (isOpened) {
      this.journalFilterDrawer.toggle();
    }
  }

}
