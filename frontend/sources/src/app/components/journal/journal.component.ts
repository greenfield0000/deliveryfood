import { SimpleResult } from './../../utils/simple-result.class';
import { BehaviorSubject, Subject } from 'rxjs';
import { JournalService } from './../../services/journal-service/journal.service';
import { AppAccountContextService } from './../../services/app-account-context-service/app-account-context.service';
import { MatSidenav } from '@angular/material';
import { MainSideNavService } from 'src/app/services/main-side-nav-service/main-side-nav.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { JournalButton } from 'src/app/classes/journal/journal-button.class';
import { JournalMetadata } from 'src/app/classes/journal/journal-metadata.class';
import { JornalColumn } from 'src/app/classes/journal/jornal-column.class';

/**
 * Описание кнопки журнала
 */

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridNg2;
  @ViewChild('journalFilterNavigator')
  private journalFilterNavigator: MatSidenav;
  private columnListSubject: Subject<JornalColumn[]> = new BehaviorSubject<JornalColumn[]>([]);
  // описание колонок сетки данных
  private columnList: any;
  // данные для сетки данных
  private rowData: any;

  private topButtonList: JournalButton[] = [{
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

  private rightButtonList: JournalButton;

  constructor(private sideNavService: MainSideNavService
    , private account: AppAccountContextService
    , private journalService: JournalService) { }

  private openFilterPanel() {
    this.sideNavService.$journalFilterDrawer = this.journalFilterNavigator;
    this.sideNavService.menuNavigatorDrawerClose();
    this.sideNavService.journalFilterDrawerOpen();
  }

  private refresh(): void {
    alert('refresh');
  }

  ngOnInit() {
    this.columnListSubject.subscribe((columnList: JornalColumn[]) => this.columnList = columnList);
  }

  public load(journalSysName: string) {
    debugger;
    if (this.account) {
      const UUID: string = this.account.getAccount().$uuid;
      this.journalService.loadJournalMetadata(journalSysName, UUID)
        .subscribe((result: SimpleResult<JournalMetadata>) => {
          const journalMetadata: JournalMetadata = new JournalMetadata(result.result);
          const columnList: JornalColumn[] = journalMetadata.$columnList;
          console.log('before journal next ', columnList);
          this.columnListSubject.next(columnList);
        });
    }
  }

}
