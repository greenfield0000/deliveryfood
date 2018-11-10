import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material';
import { MainSideNavService } from 'src/app/services/main-side-nav-service/main-side-nav.service';

@Component({
  selector: 'app-main-outlet',
  templateUrl: './main-outlet.component.html',
  styleUrls: ['./main-outlet.component.sass']
})
export class MainOutletComponent implements OnInit {

  @ViewChild(MatSidenav)
  private _drawer: MatSidenav;

  constructor(private _sideNavService: MainSideNavService) { }

  ngOnInit() {
    this._sideNavService.setDriwer(this._drawer);
  }

}
