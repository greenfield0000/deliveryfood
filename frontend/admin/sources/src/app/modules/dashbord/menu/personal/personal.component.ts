import { JournalComponent } from './../../../../components/journal/journal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IJournal } from 'src/app/components/journal/journal.interface';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit, IJournal {
  
  @ViewChild('journal') journal: JournalComponent;
  readonly journalSysName: string = 'Personals-jrnl';

  constructor() {}

  ngOnInit() {
    this.journal.load(this.journalSysName);
  }

  public getContext(): IJournal {
    return this;
  }

  public createNewPerson() {
    alert('New realisation createNewPerson');
  }

  public editPerson(selectedRow: any) {
    console.log('New realisation editPerson for ', selectedRow);
  }

  public deletePerson(selectedRow: any) {
    console.log('New realisation deletePerson ', selectedRow);
  }

}
