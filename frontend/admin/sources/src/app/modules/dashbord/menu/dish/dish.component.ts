import { Component, Injector } from '@angular/core';
import { AbstractJournalMenu } from '../abstract-journal-menu';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent extends AbstractJournalMenu<DishComponent> {
  
  getJournalHeader(): string {
    return "Журнал \"Позиция меню\"";
  }
  getJournalSysName(): string {
    return "Dish-jrnl";
  }
  getComponentContext(): DishComponent {
    return this;
  }

  constructor(protected serviceInjector: Injector) {
    super(serviceInjector);
  }

}
