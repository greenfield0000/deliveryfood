import { JornalColumn } from "./jornal-column.class";

export class ColumnMetaData {
  private id: string;
  private note: String;
  private sysName: String;
  private ownerRole: String[];
  private list: JornalColumn[];

  constructor(data?: any) {
    if (data) {
      this.id = data && data.id || '';
      this.note = data && data.note || '';
      this.sysName = data && data.sysName || '';
      this.ownerRole = data && data.ownerRole || [];
      this.list = data && data.list || [];
    }
  }

  /**
   * Getter $id
   * @return {string}
   */
  public get $id(): string {
    return this.id;
  }

  /**
   * Getter $note
   * @return {String}
   */
  public get $note(): String {
    return this.note;
  }

  /**
   * Getter $sysName
   * @return {String}
   */
  public get $sysName(): String {
    return this.sysName;
  }

  /**
   * Getter $ownerRole
   * @return {String[]}
   */
  public get $ownerRole(): String[] {
    return this.ownerRole;
  }

  /**
   * Getter $list
   * @return {JournalColumn[]}
   */
  public get $list(): JornalColumn[] {
    return this.list;
  }

  /**
   * Setter $id
   * @param {string} value
   */
  public set $id(value: string) {
    this.id = value;
  }

  /**
   * Setter $note
   * @param {String} value
   */
  public set $note(value: String) {
    this.note = value;
  }

  /**
   * Setter $sysName
   * @param {String} value
   */
  public set $sysName(value: String) {
    this.sysName = value;
  }

  /**
   * Setter $ownerRole
   * @param {String[]} value
   */
  public set $ownerRole(value: String[]) {
    this.ownerRole = value;
  }

  /**
   * Setter $list
   * @param {JournalColumn[]} value
   */
  public set $list(value: JornalColumn[]) {
    this.list = value;
  }
}
