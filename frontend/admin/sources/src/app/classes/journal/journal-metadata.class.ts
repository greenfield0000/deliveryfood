import { JornalFilter } from './jornal-filter.class';
import { JournalButton } from './journal-button.class';
import { ColumnMetaData } from './journal-column-metadata.class';
import { Preset } from './journal-preset.class';

/**
 * Объект сущности "Журнал"
 */
export class JournalMetadata {
  // выполняется ли загрузка объекта журнала в данный момент ?
  private isLoading: boolean;

  private buttonList: JournalButton[];
  private columnMetaData: ColumnMetaData;
  private presetList: Preset[];

  constructor(data?: any) {
    if (data) {
      this.isLoading = data.isLoading || false;
      this.buttonList = data.buttonList || [];
      this.columnMetaData = data.columnMetaData || new ColumnMetaData();
      this.presetList = data && data.presetList || [];
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
   * Getter $presetList
   * @return {Preset[]}
   */
  public get $presetList(): Preset[] {
    return this.presetList;
  }

  /**
   * Setter $presetList
   * @param {Preset[]} presetList
   */
  public set $presetList(presetList: Preset[]) {
    this.presetList = presetList;
  }
}
