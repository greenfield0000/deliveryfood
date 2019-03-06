import { Address } from './address';
/**
 * Сущность - пользователь
 */
export class User {
    private name: string = '';
    private surname: string = '';
    private lastname: string = '';
    private birthDay: Date;
    private phone: string = '';
    private email: string = '';
    private addressList: Array<Address> = [];

    constructor(data?: any) {
        if (data) {
            this.name = data && data.name || '';
            this.surname = data && data.surname || '';
            this.lastname = data && data.lastname || '';
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
     * Getter $surname
     * @return {string }
     */
    public get $surname(): string {
        return this.surname;
    }

    /**
     * Getter $lastname
     * @return {string }
     */
    public get $lastname(): string {
        return this.lastname;
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
     * Setter $surname
     * @param {string } value
     */
    public set $surname(value: string) {
        this.surname = value;
    }

    /**
     * Setter $lastname
     * @param {string } value
     */
    public set $lastname(value: string) {
        this.lastname = value;
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

}
