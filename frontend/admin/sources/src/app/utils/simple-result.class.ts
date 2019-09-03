import { Status } from './status.class';

export class SimpleResult<T> {
    private _status: Status;
    private _message: string;
    private _result: T;

    constructor(data?: any) {
        if (data) {
            this._status = data.status;
            this._message = data.message;
            this._result = data.result;
        }
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
