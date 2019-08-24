import { Component, OnInit } from '@angular/core';
import { MainSideNavService } from 'src/app/services/main-side-nav-service/main-side-nav.service';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {

  constructor(private sideNavService: MainSideNavService) { }

  ngOnInit() {
  }

  /**
   * Метод применения фильтра
   */
  public apply() {
    this.sideNavService.journalFilterDrawerClose();
  }

  /**
   * Метод отмены фильтрации
   */
  public cancel() {
    this.sideNavService.journalFilterDrawerClose();
  }


}
