import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material';
import { MainSideNavService } from './services/main-side-nav/main-side-nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'cost-planner';

  @ViewChild(MatSidenav)
  private _drawer: MatSidenav;

  constructor(private _sideNavService: MainSideNavService) { }

  ngOnInit() {
    this._sideNavService.setDriwer(this._drawer);
  }
}
