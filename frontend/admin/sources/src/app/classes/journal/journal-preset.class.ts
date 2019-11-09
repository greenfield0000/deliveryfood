
/**
 * Описание единицы фильтра
 */
export interface FilterItem {
    name: string;
    type: string;
    value: any;
}

/**
 * Пресеты для журналов
 */
export class Preset {
    private name: string;
    private elected: boolean;
    private itemList: FilterItem[];

    constructor(data?: any) {
        if (data) {
            this.name = data && data.name || 'Недавний';
            this.itemList = data && data.itemList || '';
        }
    }


    /**
     * Getter $name
     * @return {string}
     */
    public get $name(): string {
        return this.name;
    }

    /**
     * Getter $elected
     * @return {boolean}
     */
    public get $elected(): boolean {
        return this.elected;
    }

    /**
     * Getter $itemList
     * @return {FilterItem[]}
     */
    public get $itemList(): FilterItem[] {
        return this.itemList;
    }

    /**
     * Setter $name
     * @param {string} value
     */
    public set $name(value: string) {
        this.name = value;
    }

    /**
     * Setter $elected
     * @param {boolean} value
     */
    public set $elected(value: boolean) {
        this.elected = value;
    }

    /**
     * Setter $itemList
     * @param {FilterItem[]} value
     */
    public set $itemList(value: FilterItem[]) {
        this.itemList = value;
    }

}
