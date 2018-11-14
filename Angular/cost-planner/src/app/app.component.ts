import { AppAccountContextService } from './services/app-account-context-service/app-account-context.service';
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { MainSideNavService } from './services/main-side-nav-service/main-side-nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'cost-planner';

  @ViewChild(MatSidenav)
  private drawer: MatSidenav;

  constructor(private sideNavService: MainSideNavService,
    private appAccountContextService: AppAccountContextService) {
  }

  ngOnInit() {
    this.sideNavService.setDriwer(this.drawer);
  }
}
