import { Component, OnInit } from '@angular/core';
import { MainSideNavService } from 'src/app/services/main-side-nav/main-side-nav.service';

@Component({
  selector: 'app-header-outlet',
  templateUrl: './header-outlet.component.html',
  styleUrls: ['./header-outlet.component.sass']
})
export class HeaderOutletComponent implements OnInit {


  constructor(private _sideNavService: MainSideNavService) { }

  ngOnInit() {
  }

  public sideNavToggle() {
    if (this._sideNavService.getDriwer()) {
      this._sideNavService.getDriwer().toggle();
    }
  }
}
