import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { MainSideNavService } from './services/main-side-nav-service/main-side-nav.service';
import { AppAccountContextService } from './services/app-account-context-service/app-account-context.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'cost-planner';

  @ViewChild(MatSidenav)
  private _drawer: MatSidenav;

  constructor(private _sideNavService: MainSideNavService,
    private accountService: AppAccountContextService) { }

  ngOnInit() {
    this._sideNavService.setDriwer(this._drawer);
  }
}
