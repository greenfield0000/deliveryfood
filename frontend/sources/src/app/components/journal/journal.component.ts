import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AgGridNg2, AgGridColumn } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

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

  constructor() { }

  ngOnInit() {
  }

}
