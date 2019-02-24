import { Status } from './status.class';

export class SimpleResult<T> {
    private _status: Status;
    private _message: string;
    private _result: T;

    constructor(status: Status, message: string, result: T) {
        this._status = status;
        this._message = message;
        this._result = result;
    }

    /**
     * Getter status
     * @return {Status}
     */
    public get status(): Status {
        return this.status;
    }

    /**
     * Setter status
     * @param {Status} value
     */
    public set status(value: Status) {
        this.status = value;
    }

    /**
     * Getter message
     * @return {string}
     */
    public get message(): string {
        return this.message;
    }

    /**
     * Setter message
     * @param {string} value
     */
    public set message(value: string) {
        this.message = value;
    }

    /**
     * Getter result
     * @return {T}
     */
    public get result(): T {
        return this.result;
    }

    /**
     * Setter result
     * @param {T} value
     */
    public set result(value: T) {
        this.result = value;
    }

}
