import { Account } from './../interfaces/account';

/**
 * Класс - описывающий данные учетной записи
 */
export class AccountEntity {

    private _id: number = null;
    private _login: string = '';
    private _password: string = '';
    private _isAuthtorise: boolean = false;
    private _nickName: string = '';

    constructor(id?: number, login?: string, password?: string, isAuthtorise?: boolean) {
        this._id = id;
        this._login = login;
        this._password = password;
        this._isAuthtorise = isAuthtorise;
    }

    /**
     * Getter id
     * @return {number }
     */
    public get $id(): number {
        return this._id;
    }

    /**
     * Getter login
     * @return {string }
     */
    public get $login(): string {
        return this._login;
    }

    /**
     * Getter password
     * @return {string }
     */
    public get $password(): string {

        return this._password;
    }
    /**
     * Setter id
     * @param {number } value
     */
    public set $id(value: number) {
        this._id = value;
    }

    /**
     * Setter login
     * @param {string } value
     */
    public set $login(value: string) {
        this._login = value;
    }

    /**
     * Setter password
     * @param {string } value
     */
    public set $password(value: string) {
        this._password = value;
    }


    /**
     * Getter isAuthtorise
     * @return {boolean }
     */
    public get $isAuthtorise(): boolean {
        return this._isAuthtorise;
    }

    /**
     * Setter isAuthtorise
     * @param {boolean } value
     */
    public set $isAuthtorise(value: boolean) {
        this._isAuthtorise = value;
    }


    /**
     * Getter nickName
     * @return {string }
     */
    public get $nickName(): string {
        return this._nickName;
    }

    /**
     * Setter nickName
     * @param {string } value
     */
    public set $nickName(value: string) {
        this._nickName = value;
    }



}
