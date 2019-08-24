import { JornalColumn } from 'src/app/classes/journal/jornal-column.class';
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
import { ColumnMetaData } from 'src/app/classes/journal/journal-column-metadata.class';

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
  private columnMetaDataSubject: Subject<ColumnMetaData> = new BehaviorSubject<ColumnMetaData>(new ColumnMetaData());
  private columnListSubject: Subject<JornalColumn[]> = new BehaviorSubject<JornalColumn[]>([]);
  private topButtonListSubject: Subject<JournalButton[]> = new BehaviorSubject<JournalButton[]>([]);
  // описание колонок сетки данных
  private columnList: any;
  // данные для сетки данных
  private rowData: any;

  private topButtonList: JournalButton[] = [
    new JournalButton({
      name: 'Фильтр',
      hint: 'Применить фильтр',
      cssImageName: 'filter-btn',
      handler: () => this.openFilterPanel()
    }),
    new JournalButton({
      name: 'Обновить',
      hint: 'Обновить данные',
      cssImageName: 'refresh-btn',
      handler: () => this.refresh()
    })
  ];

  private rightButtonList: JournalButton;

  constructor(
    private sideNavService: MainSideNavService,
    private account: AppAccountContextService,
    private journalService: JournalService
  ) { }

  private openFilterPanel() {
    this.sideNavService.$journalFilterDrawer = this.journalFilterNavigator;
    this.sideNavService.menuNavigatorDrawerClose();
    this.sideNavService.journalFilterDrawerOpen();
  }

  private refresh(): void {
    alert('refresh');
  }

  ngOnInit() {
    this.columnListSubject.subscribe(
      (columnList: JornalColumn[]) => (this.columnList = columnList)
    );
    this.columnMetaDataSubject.subscribe((columnMetaData: ColumnMetaData) => {
        const list: JornalColumn[] = (columnMetaData && columnMetaData.$list ? columnMetaData.$list : []);
        this.columnListSubject.next(list);
      }
    );
    this.topButtonListSubject.subscribe((buttonList: JournalButton[]) => {
      if (buttonList) {
        buttonList.forEach((button: any) => {
          const newButton: JournalButton = new JournalButton(button);
          if (!this.topButtonList.includes(newButton)) {
            this.topButtonList.push(newButton);
          }
        });
      }
    });
  }

  public load(journalSysName: string) {
    if (this.account) {
      const UUID: string = this.account.getAccount().$uuid;
      this.journalService
        .loadJournalMetadata(journalSysName, UUID)
        .subscribe((result: SimpleResult<JournalMetadata>) => {
          const journalMetadata: JournalMetadata = new JournalMetadata(
            result.result
          );
          const columnMetaData: ColumnMetaData = new ColumnMetaData(journalMetadata.$columnMetaData);
          const buttonList: JournalButton[] = journalMetadata.$buttonList;
          console.log('before journal next ', columnMetaData);
          this.columnMetaDataSubject.next(columnMetaData);
          this.topButtonListSubject.next(buttonList);
        });
    }
  }
}
