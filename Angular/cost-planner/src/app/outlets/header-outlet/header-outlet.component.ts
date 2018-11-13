import { AppAccountContextService } from './../../services/app-account-context-service/app-account-context.service';
import { Component, OnInit } from '@angular/core';
import { MainSideNavService } from 'src/app/services/main-side-nav-service/main-side-nav.service';

@Component({
  selector: 'app-header-outlet',
  templateUrl: './header-outlet.component.html',
  styleUrls: ['./header-outlet.component.sass']
})
export class HeaderOutletComponent implements OnInit {

  constructor(private sideNavService: MainSideNavService,
    private appAccountContextService: AppAccountContextService) { }

  ngOnInit() {
  }

  /**
   * switch menu toggle
   */
  public sideNavToggle() {
    if (this.sideNavService.getDriwer()) {
      this.sideNavService.getDriwer().toggle();
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
    this.appAccountContextService.logOut();
  }

}
