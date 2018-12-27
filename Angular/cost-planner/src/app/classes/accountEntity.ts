import { Account } from './../interfaces/account';

/**
 * Класс - описывающий данные учетной записи
 */
export class AccountEntity {

    private id: number = null;
    private login: string = '';
    private password: string = '';
    private authtorised: boolean = false;
    private nickName: string = '';

    constructor(obj?: any) {
        if (obj) {
            this.id = obj && obj.id;
            this.login = obj && obj.login;
            this.password = obj && obj.password;
            this.authtorised = obj && obj.authtorised;
            this.nickName = obj && obj.nickName;
        }
    }


    /**
     * Getter $id
     * @return {number }
     */
    public get $id(): number {
        return this.id;
    }

    /**
     * Getter $login
     * @return {string }
     */
    public get $login(): string {
        return this.login;
    }

    /**
     * Getter $password
     * @return {string }
     */
    public get $password(): string {
        return this.password;
    }

    /**
     * Getter $isAuthtorise
     * @return {boolean }
     */
    public get $authtorised(): boolean {
        return this.authtorised;
    }

    /**
     * Getter $nickName
     * @return {string }
     */
    public get $nickName(): string {
        return this.nickName;
    }

    /**
     * Setter $id
     * @param {number } value
     */
    public set $id(value: number) {
        this.id = value;
    }

    /**
     * Setter $login
     * @param {string } value
     */
    public set $login(value: string) {
        this.login = value;
    }

    /**
     * Setter $password
     * @param {string } value
     */
    public set $password(value: string) {
        this.password = value;
    }

    /**
     * Setter $isAuthtorise
     * @param {boolean } value
     */
    public set $authtorised(value: boolean) {
        this.authtorised = value;
    }

    /**
     * Setter $nickName
     * @param {string } value
     */
    public set $nickName(value: string) {
        this.nickName = value;
    }

}
