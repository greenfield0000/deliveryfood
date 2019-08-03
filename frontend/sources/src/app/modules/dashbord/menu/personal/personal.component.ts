import { AppAccountContextService } from 'src/app/services/app-account-context-service/app-account-context.service';
import { JournalService } from './../../../../services/journal-service/journal.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JournalMetadata } from 'src/app/classes/journal/journal-metadata.class';
import { JornalColumn } from 'src/app/classes/journal/jornal-column.class';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {


  public rowData: any;
  public columnList: JornalColumn[];
  private journalSysName: string = 'Personals-jrnl';


  constructor(private journalService: JournalService, private account: AppAccountContextService) { }

  ngOnInit() {
    debugger;
    const UUID: string = this.account.getAccount().$uuid;
    this.journalService.loadJournalMetadata(this.journalSysName, UUID)
      .subscribe((journalMetadata: JournalMetadata) => {
          this.columnList = journalMetadata.$columnList;
      });
  }

}
