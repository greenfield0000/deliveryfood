import { Address } from './address/address.class';

/**
 * Сущность - пользователь
 */
export class User {
    private id: number;
    private name: string = '';
    private surName: string = '';
    private lastName: string = '';
    private birthDay: Date;
    private phone: string = '';
    private email: string = '';
    private addressList: Array<Address> = [];

    constructor(data?: any) {
        if (data) {
            this.id = data && data.id;
            this.name = data && data.name || '';
            this.surName = data && data.surName || '';
            this.lastName = data && data.lastName || '';
            this.birthDay = data && data.birthDay || null;
            this.phone = data && data.phone || '';
            this.email = data && data.email || '';
            this.addressList = data && data.addressList || [];
        }
    }

    /**
     * Getter $name
     * @return {string }
     */
    public get $name(): string {
        return this.name;
    }

    /**
     * Getter $surName
     * @return {string }
     */
    public get $surName(): string {
        return this.surName;
    }

    /**
     * Getter $lastName
     * @return {string }
     */
    public get $lastName(): string {
        return this.lastName;
    }

    /**
     * Getter $birthDay
     * @return {Date}
     */
    public get $birthDay(): Date {
        return this.birthDay;
    }

    /**
     * Getter $phone
     * @return {string }
     */
    public get $phone(): string {
        return this.phone;
    }

    /**
     * Getter $email
     * @return {string }
     */
    public get $email(): string {
        return this.email;
    }

    /**
     * Getter $addressList
     * @return {Array<Address> }
     */
    public get $addressList(): Array<Address> {
        return this.addressList;
    }

    /**
     * Setter $name
     * @param {string } value
     */
    public set $name(value: string) {
        this.name = value;
    }

    /**
     * Setter $surName
     * @param {string } value
     */
    public set $surName(value: string) {
        this.surName = value;
    }

    /**
     * Setter $lastName
     * @param {string } value
     */
    public set $lastName(value: string) {
        this.lastName = value;
    }

    /**
     * Setter $birthDay
     * @param {Date} value
     */
    public set $birthDay(value: Date) {
        this.birthDay = value;
    }

    /**
     * Setter $phone
     * @param {string } value
     */
    public set $phone(value: string) {
        this.phone = value;
    }

    /**
     * Setter $email
     * @param {string } value
     */
    public set $email(value: string) {
        this.email = value;
    }

    /**
     * Setter $addressList
     * @param {Array<Address> } value
     */
    public set $addressList(value: Array<Address>) {
        this.addressList = value;
    }


    /**
     * Getter $id
     * @return {number}
     */
    public get $id(): number {
        return this.id;
    }

    /**
     * Setter $id
     * @param {number} value
     */
    public set $id(value: number) {
        this.id = value;
    }


}
