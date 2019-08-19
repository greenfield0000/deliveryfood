import { JornalColumn } from './jornal-column.class';
import { JornalFilter } from './jornal-filter.class';
import { JournalButton } from './journal-button.class';

/**
 * Объект сущности "Журнал"
 */
export class JournalMetadata {
    // выполняется ли загрузка объекта журнала в данный момент ?
    private isLoading: boolean;

    private buttonList: JournalButton[];
    private columnList: JornalColumn[];
    private filter: JornalFilter;

    constructor(data?: any) {
        if (data) {
            this.isLoading = data.isLoading || false;
            this.buttonList = data.buttonList || [];
            this.columnList = data.columnList || [];
            this.filter = data.filter || [];
        }
    }

    /**
    * Getter $columnList
    * @return {JornalColumn[]}
    */
    public get $columnList(): JornalColumn[] {
        return this.columnList;
    }

    /**
     * Setter $columnList
     */
    public set $columnList(columnList: JornalColumn[]) {
        this.columnList = columnList;
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


}
