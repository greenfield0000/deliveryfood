import { JornalFilter } from './jornal-filter.class';
import { JournalButton } from './journal-button.class';
import { ColumnMetaData } from './journal-column-metadata.class';

/**
 * Объект сущности "Журнал"
 */
export class JournalMetadata {
  // выполняется ли загрузка объекта журнала в данный момент ?
  private isLoading: boolean;

  private buttonList: JournalButton[];
  private columnMetaData: ColumnMetaData;
  private filter: JornalFilter;

  constructor(data?: any) {
    if (data) {
      this.isLoading = data.isLoading || false;
      this.buttonList = data.buttonList || [];
      this.columnMetaData = data.columnMetaData || new ColumnMetaData();
      this.filter = data.filter || [];
    }
  }

  /**
   * Getter $buttonList
   * @return {JournalButton[]}
   */
  public get $buttonList(): JournalButton[] {
    return this.buttonList;
  }

  /**
   * Setter $buttonList
   * @param {JournalButton[]} value
   */
  public set $buttonList(value: JournalButton[]) {
    this.buttonList = value;
  }

  /**
   * Getter $isLoading
   * @return {boolean}
   */
  public get $isLoading(): boolean {
    return this.isLoading;
  }

  /**
   * Setter $isLoading
   * @param {boolean} value
   */
  public set $isLoading(value: boolean) {
    this.isLoading = value;
  }

  /**
   * Getter $columnMetaData
   * @return {ColumnMetaData}
   */
  public get $columnMetaData(): ColumnMetaData {
    return this.columnMetaData;
  }

  /**
   * Setter $columnMetaData
   * @param {ColumnMetaData[]} value
   */
  public set $columnMetaData(value: ColumnMetaData) {
    this.columnMetaData = value;
  }

  /**
   * Getter $filter
   * @return {JornalFilter}
   */
  public get $filter(): JornalFilter {
    return this.filter;
  }

  /**
   * Setter $filter
   * @param {JornalFilter} value
   */
  public set $filter(value: JornalFilter) {
    this.filter = value;
  }
}
