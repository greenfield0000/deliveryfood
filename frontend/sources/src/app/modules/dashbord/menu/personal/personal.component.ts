import { JournalComponent } from './../../../../components/journal/journal.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  @ViewChild('journal') journal: JournalComponent;
  private journalSysName: string = 'Personals-jrnl';

  constructor() { }

  ngOnInit() {
    debugger;
    this.journal.load(this.journalSysName);
  }

}
