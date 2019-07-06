import { AddressItemType } from 'src/app/components/address-kladr/model/address-emiter.model';
import { AddressModel } from '../../components/address-kladr/model/address.model';
import { AddressEmmiter } from '../../components/address-kladr/model/address-emiter.model';

export class AddressItem {
    private cadnum: string;
    private contentType: AddressItemType;
    private guid: string;
    private id: string;
    private ifnsfl: string;
    private ifnsul: string;
    private name: string;
    private okato: string;
    private oktmo: string;
    private parentGuid: string;
    private type: string;
    private typeShort: string;
    private zip: number;
    constructor(data?: AddressModel) {
        if (data) {
            this.cadnum = data.cadnum;
            this.contentType = data.contentType;
            this.guid = data.guid;
            this.id = data.id;
            this.ifnsfl = data.ifnsfl;
            this.ifnsul = data.ifnsul;
            this.name = data.name;
            this.okato = data.okato;
            this.oktmo = data.oktmo;
            this.parentGuid = data.parentGuid;
            this.type = data.type;
            this.typeShort = data.typeShort;
            this.zip = data.zip;
        }
    }


    /**
     * Getter $cadnum
     * @return {string}
     */
    public get $cadnum(): string {
        return this.cadnum;
    }

    /**
     * Getter $contentType
     * @return {AddressItemType}
     */
    public get $contentType(): AddressItemType {
        return this.contentType;
    }

    /**
     * Getter $guid
     * @return {string}
     */
    public get $guid(): string {
        return this.guid;
    }

    /**
     * Getter $id
     * @return {string}
     */
    public get $id(): string {
        return this.id;
    }

    /**
     * Getter $ifnsfl
     * @return {string}
     */
    public get $ifnsfl(): string {
        return this.ifnsfl;
    }

    /**
     * Getter $ifnsul
     * @return {string}
     */
    public get $ifnsul(): string {
        return this.ifnsul;
    }

    /**
     * Getter $name
     * @return {string}
     */
    public get $name(): string {
        return this.name;
    }

    /**
     * Getter $okato
     * @return {string}
     */
    public get $okato(): string {
        return this.okato;
    }

    /**
     * Getter $oktmo
     * @return {string}
     */
    public get $oktmo(): string {
        return this.oktmo;
    }

    /**
     * Getter $parentGuid
     * @return {string}
     */
    public get $parentGuid(): string {
        return this.parentGuid;
    }

    /**
     * Getter $type
     * @return {string}
     */
    public get $type(): string {
        return this.type;
    }

    /**
     * Getter $typeShort
     * @return {string}
     */
    public get $typeShort(): string {
        return this.typeShort;
    }

    /**
     * Getter $zip
     * @return {number}
     */
    public get $zip(): number {
        return this.zip;
    }

    /**
     * Setter $cadnum
     * @param {string} value
     */
    public set $cadnum(value: string) {
        this.cadnum = value;
    }

    /**
     * Setter $contentType
     * @param {AddressItemType} value
     */
    public set $contentType(value: AddressItemType) {
        this.contentType = value;
    }

    /**
     * Setter $guid
     * @param {string} value
     */
    public set $guid(value: string) {
        this.guid = value;
    }

    /**
     * Setter $id
     * @param {string} value
     */
    public set $id(value: string) {
        this.id = value;
    }

    /**
     * Setter $ifnsfl
     * @param {string} value
     */
    public set $ifnsfl(value: string) {
        this.ifnsfl = value;
    }

    /**
     * Setter $ifnsul
     * @param {string} value
     */
    public set $ifnsul(value: string) {
        this.ifnsul = value;
    }

    /**
     * Setter $name
     * @param {string} value
     */
    public set $name(value: string) {
        this.name = value;
    }

    /**
     * Setter $okato
     * @param {string} value
     */
    public set $okato(value: string) {
        this.okato = value;
    }

    /**
     * Setter $oktmo
     * @param {string} value
     */
    public set $oktmo(value: string) {
        this.oktmo = value;
    }

    /**
     * Setter $parentGuid
     * @param {string} value
     */
    public set $parentGuid(value: string) {
        this.parentGuid = value;
    }

    /**
     * Setter $type
     * @param {string} value
     */
    public set $type(value: string) {
        this.type = value;
    }

    /**
     * Setter $typeShort
     * @param {string} value
     */
    public set $typeShort(value: string) {
        this.typeShort = value;
    }

    /**
     * Setter $zip
     * @param {number} value
     */
    public set $zip(value: number) {
        this.zip = value;
    }

}
