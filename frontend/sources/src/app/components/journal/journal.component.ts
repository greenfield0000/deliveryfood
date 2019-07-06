import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AgGridNg2, AgGridColumn } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

/**
 * Описание кнопки журнала
 */
export interface JournalButton {
  name: string;
  hint: string;
  cssImageName: string;
}

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridNg2;
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
  },
  {
    name: 'Обновить'
    , hint: 'Обновить данные'
    , cssImageName: 'journal-btn refresh-btn'
  }];
  public rightButtonList: JournalButton;

  constructor() { }

  private pageSizeOptions: any = {};

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
