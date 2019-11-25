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
import { IJournal } from './journal.interface';
import { Preset } from 'src/app/classes/journal/journal-preset.class';

/**
 * Описание кнопки журнала
 */

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {
  @Input()
  public context: IJournal;
  @ViewChild('agGrid') agGrid: AgGridNg2;
  @ViewChild('journalFilterNavigator')
  private journalFilterNavigator: MatSidenav;
  private columnMetaDataSubject: Subject<ColumnMetaData> = new BehaviorSubject<ColumnMetaData>(new ColumnMetaData());
  private columnListSubject: Subject<JornalColumn[]> = new BehaviorSubject<JornalColumn[]>([]);
  private topButtonListSubject: Subject<JournalButton[]> = new BehaviorSubject<JournalButton[]>([]);
  public presetListSubject: Subject<Preset[]> = new BehaviorSubject<Preset[]>([]);

  // описание колонок сетки данных
  public columnList: any;
  // данные для сетки данных
  public rowData: any;

  public topButtonList: JournalButton[] = [
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

  public rightButtonList: JournalButton;

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
    this.loadData(this.context.journalSysName);
  }

  ngOnInit() {
    if (!this.context) {
      throw new Error('Не установлен контекст журнала');
    }

    this.journalService.context = this.context;
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
            const journalContext = this.journalService.context;
            if (button.handlerFnName) {
              newButton.handler = journalContext[button.handlerFnName];
            }
            this.topButtonList.push(newButton);
          }
        });
      }
    });
  }

  /**
   * Основная функция загрузки журнала. Входит первоначальная загрузка метаданных журнала, 
   * а также (при успехе) загружает данные по этому журналу
   * @param journalSysName системное имя журнала
   */
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
          const presetList: Preset[] = journalMetadata.$presetList;
          console.log('before journal next ', columnMetaData);

          this.columnMetaDataSubject.next(columnMetaData);
          this.topButtonListSubject.next(buttonList);
          this.presetListSubject.next(presetList);
          // загружаем данные
          this.loadData(journalSysName);
        });
    }
  }


  /**
   * Загрузка данных по журналу.
   * 
   * @param journalSysName системное имя журнала
   * 
   */
  private loadData(journalSysName: string) {
    if (journalSysName) {
      this.journalService.loadJournalData(journalSysName).subscribe(res => {
        console.log('loaded journal data = ', res);
        if (res && res.result && res.result.rows) {
          this.rowData = res.result.rows;
        }
      });
      return;
    }
    console.log('Unavaiable load data for jornal, because journal sysname is empty or null');
  }
}
