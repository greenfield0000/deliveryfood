import { HttpHeaders } from '@angular/common/http';

/**
 * Класс-константа для Http-сервиса
 */
export class HttpConstant {

    public static HTTP_OPTIONS = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

}
