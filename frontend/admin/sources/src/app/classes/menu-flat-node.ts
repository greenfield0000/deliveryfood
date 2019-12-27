
/** Flat node with expandable and level information */
export class MenuFlatNode {

    // Начальное смещение относительно родителя
    private readonly DEFAULT_START_OFFSET: number = 50;

    private _expandable: boolean;
    private _name: string;
    private _level: number;
    private _pathOfDash: string;
    private _image: string;
    private _offset: string = String(this._level * this.DEFAULT_START_OFFSET) + 'px';

    constructor(
        public expandable: boolean,
        public name: string,
        public level: number,
        public pathOfDash: string,
        public image: string
    ) {
        this._expandable = expandable;
        this._name = name;
        this._level = level;
        this._pathOfDash = pathOfDash;
        this._image = image;

        this._offset = '0px';
        if (level) {
            this._offset = String(this._level * this.DEFAULT_START_OFFSET) + 'px';
        }
    }


    /**
     * Getter expandable
     * @return {boolean}
     */
    public get $expandable(): boolean {
        return this._expandable;
    }

    /**
     * Getter name
     * @return {string}
     */
    public get $name(): string {
        return this._name;
    }

    /**
     * Getter level
     * @return {number}
     */
    public get $level(): number {
        return this._level;
    }

    /**
     * Getter pathOfDash
     * @return {string}
     */
    public get $pathOfDash(): string {
        return this._pathOfDash;
    }

    /**
     * Getter image
     * @return {string}
     */
    public get $image(): string {
        return this._image;
    }

    /**
     * Getter offset
     * @return {string }
     */
    public get $offset(): string {
        return this._offset;
    }

    /**
     * Setter expandable
     * @param {boolean} value
     */
    public set $expandable(value: boolean) {
        this._expandable = value;
    }

    /**
     * Setter name
     * @param {string} value
     */
    public set $name(value: string) {
        this._name = value;
    }

    /**
     * Setter level
     * @param {number} value
     */
    public set $level(value: number) {
        this._level = value;
    }

    /**
     * Setter pathOfDash
     * @param {string} value
     */
    public set $pathOfDash(value: string) {
        this._pathOfDash = value;
    }

    /**
     * Setter image
     * @param {string} value
     */
    public set $image(value: string) {
        this._image = value;
    }

    /**
     * Setter offset
     * @param {string } value
     */
    public set $offset(value: string) {
        this._offset = value;
    }

}
