import { Component, OnInit, ViewChild } from '@angular/core';
import { MainSideNavService } from 'src/app/services/main-side-nav/main-side-nav.service';
import { MatDrawer } from '@angular/material';

@Component({
  selector: 'app-main-outlet',
  templateUrl: './main-outlet.component.html',
  styleUrls: ['./main-outlet.component.sass']
})
export class MainOutletComponent implements OnInit {

  @ViewChild(MatDrawer)
  private _drawer: MatDrawer;

  constructor(private _sideNavService: MainSideNavService) { }

  ngOnInit() {
    this._sideNavService.setDriwer(this._drawer);
  }

}
