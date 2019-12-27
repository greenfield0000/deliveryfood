

/**
 * Menu node data with nested structure.
 * Each node has a Menuname, and a type or a list of children.
 */
export class MenuNode {
    private children: MenuNode[] = [];
    private name: string;
    private sysName: string;
    private pathOfDash: string;
    private image: string;
    private type: any;
    private que: string;
    private level: string;
    private offset: string = '0px';

    /**
     * Getter $children
     * @return {MenuNode[]}
     */
    public get $children(): MenuNode[] {
        return this.children;
    }

    /**
     * Getter $name
     * @return {string}
     */
    public get $name(): string {
        return this.name;
    }

    /**
     * Getter $sysName
     * @return {string}
     */
    public get $sysName(): string {
        return this.sysName;
    }

    /**
     * Getter $pathOfDash
     * @return {string}
     */
    public get $pathOfDash(): string {
        return this.pathOfDash;
    }

    /**
     * Getter $type
     * @return {any}
     */
    public get $type(): any {
        return this.type;
    }

    /**
     * Getter $que
     * @return {string}
     */
    public get $que(): string {
        return this.que;
    }

    /**
     * Setter $children
     * @param {MenuNode[]} value
     */
    public set $children(value: MenuNode[]) {
        this.children = value;
    }

    /**
     * Setter $name
     * @param {string} value
     */
    public set $name(value: string) {
        this.name = value;
    }

    /**
     * Setter $sysName
     * @param {string} value
     */
    public set $sysName(value: string) {
        this.sysName = value;
    }

    /**
     * Setter $pathOfDash
     * @param {string} value
     */
    public set $pathOfDash(value: string) {
        this.pathOfDash = value;
    }

    /**
     * Setter $type
     * @param {any} value
     */
    public set $type(value: any) {
        this.type = value;
    }

    /**
     * Setter $que
     * @param {string} value
     */
    public set $que(value: string) {
        this.que = value;
    }

    /**
     * Getter $image
     * @return {string}
     */
    public get $image(): string {
        return this.image;
    }

    /**
     * Setter $image
     * @param {string} value
     */
    public set $image(value: string) {
        this.image = value;
    }


    /**
     * Getter $level
     * @return {string}
     */
    public get $level(): string {
        return this.level;
    }

    /**
     * Getter $offset
     * @return {string }
     */
    public get $offset(): string {
        return this.offset;
    }

    /**
     * Setter $level
     * @param {string} value
     */
    public set $level(value: string) {
        this.level = value;
    }

    /**
     * Setter $offset
     * @param {string } value
     */
    public set $offset(value: string) {
        this.offset = value;
    }


}
