import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if (token && token.length > 0) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer_${localStorage.getItem('token')}`
                }
            });
        }
        return next.handle(request);
    }
}
