import { Component, Injector } from '@angular/core';
import { AbstractJournalMenu } from '../abstract-journal-menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends AbstractJournalMenu<MenuComponent> {

  getJournalHeader(): string {
    throw new Error("Method not implemented.");
  }

  getJournalSysName(): string {
    return "Menu-jrnl";
  }

  getComponentContext(): MenuComponent {
    return this;
  }

  constructor(protected serviceInjector: Injector) {
    super(serviceInjector);
  }

}
