import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SimpleResult } from 'src/app/utils/simple-result.class';
import { RouteConstant } from 'src/app/constants/route-constant';
import { JournalMetadata } from 'src/app/classes/journal/journal-metadata.class';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  // по умолчанию, считаем, что что-то грузим, т.к. это сервис никаких манипуляций, кроме как
  // загрузка метаданных журнала, ничего не делает
  private journalMetadata: BehaviorSubject<JournalMetadata> = new BehaviorSubject<JournalMetadata>(
    new JournalMetadata({ isLoading: true })
  );

  constructor(private http: HttpClient) {
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
        RouteConstant.journal_location + '/load', { sysName: journalSysName, uuid: uuid }
      );
  }
}
