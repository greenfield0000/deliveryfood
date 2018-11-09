import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-outlet',
  templateUrl: './main-outlet.component.html',
  styleUrls: ['./main-outlet.component.sass']
})
export class MainOutletComponent implements OnInit {

  private _showFiller = false;

  constructor() { }

  ngOnInit() {
  }

  public get showFilter(): boolean {
    return this._showFiller;
  }

  public set showFilter(showFilter: boolean) {
    this._showFiller = showFilter;
  }


}
