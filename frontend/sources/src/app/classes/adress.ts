
/**
 * Класс для хранения структуры информации о адресе
 */
export class Adress {

    private token: string;
    private regionId: string;
    private districtId: string;
    private cityId: string;
    private streetId: string;
    private buildingId: string;
    private query: string;
    private contentType: string;
    private withParent: number;
    private limit: string;
    private offset: string;
    private typeCode: number;
    private zip: string;
    private callback: Function;

    constructor() { }


    /**
     * Getter $token
     * @return {string}
     */
    public get $token(): string {
        return this.token;
    }

    /**
     * Getter $regionId
     * @return {string}
     */
    public get $regionId(): string {
        return this.regionId;
    }

    /**
     * Getter $districtId
     * @return {string}
     */
    public get $districtId(): string {
        return this.districtId;
    }

    /**
     * Getter $cityId
     * @return {string}
     */
    public get $cityId(): string {
        return this.cityId;
    }

    /**
     * Getter $streetId
     * @return {string}
     */
    public get $streetId(): string {
        return this.streetId;
    }

    /**
     * Getter $buildingId
     * @return {string}
     */
    public get $buildingId(): string {
        return this.buildingId;
    }

    /**
     * Getter $query
     * @return {string}
     */
    public get $query(): string {
        return this.query;
    }

    /**
     * Getter $contentType
     * @return {string}
     */
    public get $contentType(): string {
        return this.contentType;
    }

    /**
     * Getter $withParent
     * @return {number}
     */
    public get $withParent(): number {
        return this.withParent;
    }

    /**
     * Getter $limit
     * @return {string}
     */
    public get $limit(): string {
        return this.limit;
    }

    /**
     * Getter $offset
     * @return {string}
     */
    public get $offset(): string {
        return this.offset;
    }

    /**
     * Getter $typeCode
     * @return {number}
     */
    public get $typeCode(): number {
        return this.typeCode;
    }

    /**
     * Getter $zip
     * @return {string}
     */
    public get $zip(): string {
        return this.zip;
    }

    /**
     * Getter $callback
     * @return {Function}
     */
    public get $callback(): Function {
        return this.callback;
    }

    /**
     * Setter $token
     * @param {string} value
     */
    public set $token(value: string) {
        this.token = value;
    }

    /**
     * Setter $regionId
     * @param {string} value
     */
    public set $regionId(value: string) {
        this.regionId = value;
    }

    /**
     * Setter $districtId
     * @param {string} value
     */
    public set $districtId(value: string) {
        this.districtId = value;
    }

    /**
     * Setter $cityId
     * @param {string} value
     */
    public set $cityId(value: string) {
        this.cityId = value;
    }

    /**
     * Setter $streetId
     * @param {string} value
     */
    public set $streetId(value: string) {
        this.streetId = value;
    }

    /**
     * Setter $buildingId
     * @param {string} value
     */
    public set $buildingId(value: string) {
        this.buildingId = value;
    }

    /**
     * Setter $query
     * @param {string} value
     */
    public set $query(value: string) {
        this.query = value;
    }

    /**
     * Setter $contentType
     * @param {string} value
     */
    public set $contentType(value: string) {
        this.contentType = value;
    }

    /**
     * Setter $withParent
     * @param {number} value
     */
    public set $withParent(value: number) {
        this.withParent = value;
    }

    /**
     * Setter $limit
     * @param {string} value
     */
    public set $limit(value: string) {
        this.limit = value;
    }

    /**
     * Setter $offset
     * @param {string} value
     */
    public set $offset(value: string) {
        this.offset = value;
    }

    /**
     * Setter $typeCode
     * @param {number} value
     */
    public set $typeCode(value: number) {
        this.typeCode = value;
    }

    /**
     * Setter $zip
     * @param {string} value
     */
    public set $zip(value: string) {
        this.zip = value;
    }

    /**
     * Setter $callback
     * @param {Function} value
     */
    public set $callback(value: Function) {
        this.callback = value;
    }
}
