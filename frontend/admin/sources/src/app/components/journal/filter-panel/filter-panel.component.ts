import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { MainSideNavService } from 'src/app/services/main-side-nav-service/main-side-nav.service';
import { Preset, FilterItem } from 'src/app/classes/journal/journal-preset.class';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {

  @Input()
  public presetListSubject: Observable<Preset[]>;

  private activePreset: Preset;
  public presetNameList: string[] = [];
  public presetItemList: FilterItem[];

  public  presetList: Preset[];

  constructor(private sideNavService: MainSideNavService) { }

  ngOnInit() {
    this.presetListSubject.subscribe((presetList: Preset[]) => {
    this.presetList = presetList;
      if (this.presetList && this.presetList.length > 0) {
        this.presetList.forEach((p: any) => this.presetNameList.push(p.name));
        this.activePreset = new Preset(this.presetList[0]);
        this.presetItemList = this.activePreset.$itemList || [];
      }
    });
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

  /**
   * При смене дропа меняем активный пресет
   */
  public selectionChange(index: number) {
    if (!index && this.presetList && this.presetList.length !== 0) {
      this.activePreset = new Preset(this.presetList[0]);
    }

    if (index && this.presetList && this.presetList.length !== 0) {
      this.activePreset = new Preset(this.presetList[index]);
    }

    this.presetItemList = this.activePreset.$itemList || [];
  }
}
