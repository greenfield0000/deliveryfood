import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { MainSideNavService } from './services/main-side-nav-service/main-side-nav.service';
import { AccountEntity } from './classes/accountEntity';
import { AppAccountContextService } from './services/app-account-context-service/app-account-context.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  private account: AccountEntity = new AccountEntity();

  @ViewChild(MatSidenav)
  private drawer: MatSidenav;

  constructor(private sideNavService: MainSideNavService,
    private appAccountContextService: AppAccountContextService) {
  }

  ngOnInit() {
    this.account = this.appAccountContextService.getAccount();
    console.log('account initialized', this.account);
    this.sideNavService.setDriwer(this.drawer);
  }

  isAuthtorised(): boolean {
    return this.account && this.account.$authtorised || false;
  }
}
