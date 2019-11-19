import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SimpleResult } from 'src/app/utils/simple-result.class';
import { JournalMetadata } from 'src/app/classes/journal/journal-metadata.class';
import { HttpService } from '../http-service/http.service';
import { IJournal } from 'src/app/components/journal/journal.interface';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  private _context: IJournal;


  constructor(private http: HttpService) {
  }

  /**
   * Общий метод для вызова сервисных функций журнала 
   * @param methodName имя метода, который вызывается
   * @param postParams параметры вызова (у каждого метода могут быть свои)
   */
  private post<T>(methodName, postParams?: any): Observable<SimpleResult<T>> {
    if (!postParams) {
      postParams = {};
    }
    return this.http
      .post<SimpleResult<T>>(
        environment.gatePath.journal_location + '/' + methodName, postParams
      );
  }

  /**
   * Метод загрузки метаданных для построения журнала.
   * В него входит загрузка журнала, кнопок-обработчиков, параметров фильтрации,
   * пресеты (уникальные для каждого пользователя, именно поэтому передается uuid)
   *
   * @param journalSysName системное имя  журнала
   * @param uuid уникальный идентифкатор пользователя
   */
  public loadJournalMetadata(journalSysName: string, uuid: string): Observable<SimpleResult<JournalMetadata>> {
    const callParams = {
      journalSysName: journalSysName, uuid: uuid
    };
    return this.post<JournalMetadata>('load', callParams);
  }

  /**
   * Метод загрузки данных журнала
   * 
   * @param journalSysName системное имя  журнала
   * @param uuid уникальный идентифкатор пользователя
   */
  public loadJournalData(journalSysName: string, pageNumber: number = 0): Observable<SimpleResult<any>> {
    const callParams = {
      journalSysName: journalSysName, pageNumber: pageNumber
    };
    return this.post('loadData', callParams);
  }

  /**
   * Getter context
   * @return {IJournal}
   */
  public get context(): IJournal {
    return this._context;
  }

  /**
   * Setter context
   * @param {IJournal} value
   */
  public set context(value: IJournal) {
    this._context = value;
  }

}
