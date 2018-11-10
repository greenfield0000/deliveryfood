import { Account } from './../interfaces/account';

/**
 * Класс - описывающий данные учетной записи
 */
export class AccountEntity implements Account {

    private _login: string;
    private _password: string;
    private _isAuthtorise = false;

    isAuthtorise(): boolean {
        return this._isAuthtorise;
    }

    /**
     * Getter $login
     */
    public get login(): string {
        return this._login;
    }

    /**
     * Getter $password
     */
    public get password(): string {
        return this._password;
    }

    /**
     * Setter $login
     */
    public set login(value: string) {
        this._login = value;
    }

    /**
     * Setter $password
     */
    public set password(value: string) {
        this._password = value;
    }

}
