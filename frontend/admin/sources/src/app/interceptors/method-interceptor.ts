import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class MethodInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request && request.method.length > 0) {
            request = request.clone({
                setHeaders: {
                    'Request Method': request.method
                }
            });
        }
        return next.handle(request);
    }
}