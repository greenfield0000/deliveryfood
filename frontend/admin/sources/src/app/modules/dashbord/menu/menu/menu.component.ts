import { Component, Injector } from '@angular/core';
import { AbstractJournalMenu } from '../abstract-journal-menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends AbstractJournalMenu<MenuComponent> {

  getJournalHeader(): string {
    return "Журнал \"Меню\"";
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
