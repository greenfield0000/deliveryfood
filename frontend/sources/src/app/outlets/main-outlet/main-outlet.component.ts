import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material';
import { MainSideNavService } from 'src/app/services/main-side-nav-service/main-side-nav.service';

@Component({
  selector: 'app-main-outlet',
  templateUrl: './main-outlet.component.html',
  styleUrls: ['./main-outlet.component.scss']
})
export class MainOutletComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
