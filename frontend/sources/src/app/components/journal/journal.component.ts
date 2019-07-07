import { AppAccountContextService } from './../../services/app-account-context-service/app-account-context.service';
import { MatSidenav } from '@angular/material';
import { MainSideNavService } from 'src/app/services/main-side-nav-service/main-side-nav.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';

/**
 * Описание кнопки журнала
 */
export interface JournalButton {
  name: string;
  hint: string;
  cssImageName: string;
  handler: (params?: any) => any;
}

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridNg2;
  @ViewChild('journalFilterNavigator')
  private journalFilterNavigator: MatSidenav;
  // описание колонок сетки данных
  @Input()
  public columnDefs: any;
  // данные для сетки данных
  @Input()
  public rowData: any;


  public topButtonList: JournalButton[] = [{
    name: 'Фильтр'
    , hint: 'Применить фильтр'
    , cssImageName: 'journal-btn filter-btn'
    , handler: () => this.openFilterPanel()
  },
  {
    name: 'Обновить'
    , hint: 'Обновить данные'
    , cssImageName: 'journal-btn refresh-btn'
    , handler: () => this.refresh()
  }];

  public rightButtonList: JournalButton;

  constructor(private sideNavService: MainSideNavService, private appAccountContextService: AppAccountContextService) { }

  private openFilterPanel() {
    this.sideNavService.$journalFilterDrawer = this.journalFilterNavigator;
    this.sideNavService.menuNavigatorDrawerClose();
    this.sideNavService.journalFilterDrawerOpen();
  }

  private refresh(): void {
    alert('refresh');
  }

  ngOnInit() {

    this.columnDefs = [
      { headerName: 'Athlete', field: 'athlete', width: 150 },
      { headerName: 'Age', field: 'age', width: 90 },
      { headerName: 'Country', field: 'country', width: 120 },
      { headerName: 'Year', field: 'year', width: 90 },
      { headerName: 'Date', field: 'date', width: 110 },
      { headerName: 'Sport', field: 'sport', width: 110 },
      { headerName: 'Gold', field: 'gold', width: 100 },
      { headerName: 'Silver', field: 'silver', width: 100 },
      { headerName: 'Bronze', field: 'bronze', width: 100 },
      { headerName: 'Total', field: 'total', width: 100 }
    ];
  }

}
