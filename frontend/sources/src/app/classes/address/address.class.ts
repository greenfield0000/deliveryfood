import { AddressItem } from './address-item.class';

/**
 * Класс для хранения структуры информации о адресе
 */
export class Address {

    private region: AddressItem;
    private city: AddressItem;
    private street: AddressItem;
    private building: AddressItem;
    private appartment: string;

    /**
     * Getter $region
     * @return {AddressItem}
     */
    public get $region(): AddressItem {
        return this.region;
    }

    /**
     * Getter $city
     * @return {AddressItem}
     */
    public get $city(): AddressItem {
        return this.city;
    }

    /**
     * Getter $street
     * @return {AddressItem}
     */
    public get $street(): AddressItem {
        return this.street;
    }

    /**
     * Getter $building
     * @return {AddressItem}
     */
    public get $building(): AddressItem {
        return this.building;
    }

    /**
     * Getter $appartment
     * @return {string}
     */
    public get $appartment(): string {
        return this.appartment;
    }

    /**
     * Setter $region
     * @param {AddressItem} value
     */
    public set $region(value: AddressItem) {
        this.region = value;
    }

    /**
     * Setter $city
     * @param {AddressItem} value
     */
    public set $city(value: AddressItem) {
        this.city = value;
    }

    /**
     * Setter $street
     * @param {AddressItem} value
     */
    public set $street(value: AddressItem) {
        this.street = value;
    }

    /**
     * Setter $building
     * @param {AddressItem} value
     */
    public set $building(value: AddressItem) {
        this.building = value;
    }

    /**
     * Setter $appartment
     * @param {string} value
     */
    public set $appartment(value: string) {
        this.appartment = value;
    }


}
