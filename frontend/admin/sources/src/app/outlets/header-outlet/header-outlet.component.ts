import { AccountEntity } from './../../classes/accountEntity';
import { AppAccountContextService } from './../../services/app-account-context-service/app-account-context.service';
import { Component, OnInit } from '@angular/core';
import { MainSideNavService } from 'src/app/services/main-side-nav-service/main-side-nav.service';
import { MenuService } from 'src/app/services/menu-service/menu.service';

@Component({
  selector: 'app-header-outlet',
  templateUrl: './header-outlet.component.html',
  styleUrls: ['./header-outlet.component.scss']
})
export class HeaderOutletComponent implements OnInit {

  public account: AccountEntity = new AccountEntity();

  constructor(private sideNavService: MainSideNavService,
    private appAccountContextService: AppAccountContextService,
    private menuService: MenuService) { }

  ngOnInit() {
    this.account = this.appAccountContextService.getAccount();
    this.menuService.initialize();
  }

  /**
   * switch menu toggle
   */
  public sideNavToggle() {
    if (this.sideNavService.$menuNavigatorDrawer) {
      this.sideNavService.drawerToggle(this.sideNavService.$menuNavigatorDrawer);
    }
  }

  /**
   * Edit account profile
   */
  public editAccount() {

  }

  /**
   * Exit application
   */
  public signOut() {
    this.sideNavService.journalFilterDrawerClose();
    this.sideNavService.menuNavigatorDrawerClose();
    this.appAccountContextService.logOut();
  }

}
