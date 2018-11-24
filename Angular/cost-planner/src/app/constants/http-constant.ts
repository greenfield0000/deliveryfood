import { HttpHeaders } from '@angular/common/http';


/**
 * Класс-константа для Http-сервиса
 */
export class HttpConstant {

    public static HTTP_OPTIONS = {
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
            'Access-Control-Allow-Origin': '*'
        })
    };

}
