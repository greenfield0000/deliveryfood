import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { MainSideNavService } from './services/main-side-nav-service/main-side-nav.service';
import { AccountEntity } from './classes/accountEntity';
import { AppAccountContextService } from './services/app-account-context-service/app-account-context.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private account: AccountEntity = new AccountEntity();

  @ViewChild('menuNavigator')
  private menuNavigator: MatSidenav;

  constructor(private sideNavService: MainSideNavService,
    private appAccountContextService: AppAccountContextService) {
  }

  ngOnInit() {
    this.account = this.appAccountContextService.getAccount();
    console.log('account initialized', this.account);
    this.sideNavService.$menuNavigatorDrawer = <MatSidenav>(this.menuNavigator);
  }

  isAuthtorised(): boolean {
    return this.account && this.account.$authtorised;
  }
}
