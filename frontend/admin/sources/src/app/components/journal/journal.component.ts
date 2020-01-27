import { switchMap } from 'rxjs/operators';
import { JornalColumn } from 'src/app/classes/journal/jornal-column.class';
import { SimpleResult } from './../../utils/simple-result.class';
import { BehaviorSubject, Subject, Observable, of, observable } from 'rxjs';
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
import { RowNumberRenderer } from './cell-renders/rownumber-renderer.component';
import { AppRouteService } from 'src/app/services/app-route-service/app-route.service';
import { ModalWindowService } from 'src/app/services/modal-window-service/modal-window.service';

/**
 * Описание кнопки журнала
 */

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent<T> implements OnInit {

  @Input()
  public rowSelection: string = 'single';
  @Input()
  public context: IJournal<T>;
  @Input()
  public journalHeader: string;

  @ViewChild('agGrid') agGrid: AgGridNg2;
  @ViewChild('journalFilterNavigator')
  public journalFilterNavigator: MatSidenav;
  public columnMetaDataSubject: Subject<ColumnMetaData> = new BehaviorSubject<ColumnMetaData>(new ColumnMetaData());
  public columnListSubject: Subject<JornalColumn[]> = new BehaviorSubject<JornalColumn[]>([]);
  public topButtonListSubject: Subject<JournalButton[]> = new BehaviorSubject<JournalButton[]>([]);
  public presetListSubject: Subject<Preset[]> = new BehaviorSubject<Preset[]>([]);

  // апи для работы с сеткой данных
  private gridApi;
  // апи для работы с колонками
  private gridColumnApi;
  // выбранные колонки пользователем
  public selectedRows;

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

  // Регистрация доп. компонентов для сетки данных
  public frameworkComponents = {
    rowNumberCellRenderer: RowNumberRenderer
  };

  // Общие колонки для всех журналов
  public commonColumnList: any[] = [
    {
      checkboxSelection: false,
      field: 'rownum',
      filter: false,
      headerName: '№',
      sortable: false,
      pinned: 'left',
      lockPinned: true,
      width: 60
    }
  ];

  constructor(
    private sideNavService: MainSideNavService,
    private appContextService: AppAccountContextService,
    private journalService: JournalService
  ) {
    // Регистрируем подписчика на изменение данных журнала
    this.journalService.journalLoadData.subscribe(simpleResult => {
      let rows = [];
      if (simpleResult.result && simpleResult.result['rows']) {
        rows = simpleResult.result['rows'];
      }
      this.rowData = rows;
    });
  }

  ngOnInit(): void {
    this.loadData(this.context.getJournalSysName());
  }

  private openFilterPanel() {
    this.sideNavService.$journalFilterDrawer = this.journalFilterNavigator;
    this.sideNavService.menuNavigatorDrawerClose();
    this.sideNavService.journalFilterDrawerOpen();
  }

  private refresh(): void {
    this.loadData(this.context.getJournalSysName());
  }

  /**
   * Основная функция загрузки журнала. Входит первоначальная загрузка метаданных журнала, 
   * а также (при успехе) загружает данные по этому журналу
   * @param journalSysName системное имя журнала
   */
  public load(journalSysName: string) {
    if (this.appContextService) {
      const UUID: string = this.appContextService.getAccount().$uuid;
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
        this.journalService.refreshLoadData(res);
      });
      return;
    }
    console.log('Unavaiable load data for jornal, because journal sysname is empty or null');
  }

  /**
   * Функция выбора строки в сетке данных
   * @param selectionRow объект выбранной записи
   */
  public onSelectionChanged(e: any) {
    this.selectedRows = this.gridApi.getSelectedRows();
    console.log('Selected rows ', this.selectedRows);
  }

  /**
   * Функция готовности сетки данных
   * @param grid 
   */
  public onGridReady(grid) {
    console.log('grid ready ', grid);
    this.gridApi = grid.api;
    this.gridColumnApi = grid.columnApi;

    if (!this.context) {
      throw new Error('Не установлен контекст журнала');
    }

    this.journalService.context = this.context;
    this.columnListSubject.subscribe(
      (columnList: JornalColumn[]) => {
        columnList.push(... this.commonColumnList);
        this.columnList = columnList;
      }
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

  isAuthtorised(): boolean {
    return this.appContextService.isAuthtorised();
  }

}
