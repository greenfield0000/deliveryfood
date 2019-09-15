import { environment } from './../../../environments/environment';
import { SimpleResult } from './../../utils/simple-result.class';
import { DialogComponent } from './../../components/modal-window/common/dialog/dialog.component';
import { ModalWindowService } from 'src/app/services/modal-window-service/modal-window.service';
import { IDialogType } from './../modal-window-service/idialog.type';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, catchError } from 'rxjs/operators';

/**
 * Общий сервис
 */
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private defaultErrorMessage: string = `Произошла ошибка вызова сервиса. Сервис временно недоступен.
  Попробуйте выполнить данное действие через некоторое время.`;

  constructor(private http: HttpClient, private modalWindow: ModalWindowService) { }

  public handleResponse<T>(result: T): Observable<any> {
    const simpleResult: any = Object.assign({}, result);
    if ((!simpleResult) || ((simpleResult) && (simpleResult.status) && (simpleResult.status.toString() === 'ERROR'))) {
      const messageInfo: string = simpleResult && simpleResult.message || this.defaultErrorMessage;
      return this.modalWindow.openDialog(IDialogType.INFO, DialogComponent, {
        message: messageInfo
      });
    }
    return of(result);
  }

  public post<T>(url: string, params: any = {}, headers: HttpHeaders = environment.headers): Observable<T> {
    const options = {
      headers: headers
    };
    return this.http.post<T>(url, params, options).pipe(
      switchMap((res) => this.handleResponse(res)),
      catchError(err => {
        console.log(err);
        this.modalWindow.openDialog(IDialogType.ERROR, DialogComponent, {
          message: this.defaultErrorMessage
        });
        return of({});
      })
    );
  }
}
