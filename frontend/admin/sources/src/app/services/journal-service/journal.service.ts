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
   * Метод загрузки метаданных для построения журнала.
   * В него входит загрузка журнала, кнопок-обработчиков, параметров фильтрации,
   * пресеты (уникальные для каждого пользователя, именно поэтому передается uuid)
   *
   * @param journalSysName системное имя  журнала
   * @param uuid уникальный идентифкатор пользователя
   */
  public loadJournalMetadata(journalSysName: string, uuid: string): Observable<SimpleResult<JournalMetadata>> {
    return this.http
      .post<SimpleResult<JournalMetadata>>(
        environment.gatePath.journal_location + '/load', { sysName: journalSysName, uuid: uuid }
      );
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
