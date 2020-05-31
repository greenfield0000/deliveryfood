import { Component } from '@angular/core';
import { AbstractJournalMenu } from '../abstract-journal-menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class DishComponent extends AbstractJournalMenu<DishComponent> {
  
  getJournalHeader(): string {
    return "Журнал позиций";
  }
  getJournalSysName(): string {
    return "Dish-jrnl";
  }
  getComponentContext(): DishComponent {
    return this;
  }

}
