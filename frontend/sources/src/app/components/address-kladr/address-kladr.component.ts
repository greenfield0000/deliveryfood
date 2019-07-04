import { AddressModel } from './model/address.model';
import { KladrService } from 'src/app/services/kladr-service/kladr.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Address } from '../../classes/address';
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { Subscription, Observable, Subject, from } from 'rxjs';
import { ReactiveForm } from 'src/app/classes/reactive-form';
import {
  map,
  startWith,
  filter,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

import { AddressEmmiter, AddressItemType } from './model/address-emiter.model';
import { SimpleResult } from 'src/app/utils/simple-result.class';

/**
 * Компонент работы с kladr.
 *
 *   Описание параметров описанны ниже (взято в с ресурса http://kladr-api.ru/integration):
 *
 *  1) token — (необязательно) Токен для доступа к сервису. Используется только для доступа к платным серверам
 *  2) regionId — Код региона (области)
 *  3) districtId — Код района
 *  4) cityId — Код города (населённого пункта)
 *  5) streetId — Код улицы
 *  6) buildingId — Код дома (строения)
 *  7) query — Строка для поиска по названию
 *  8) contentType — Тип возвращаемых объектов (region, district, city, street, building)
 *  9) withParent — Если 1, сервис вернёт объекты вместе с родительскими (для района это регион, для населённого пункта район и регион и т.п.)
 *  10) limit — Количество возвращаемых объектов
 *  11) offset — Смещение в выдаче (для организации постраничного вывода)
 *  12) typeCode — Тип объектов для выдачи:
 *    1 — города
 *    2 — поселки
 *    4 — деревни
 *
 *    Битовые комбинации, например, 3 ( 1 | 2 ) — города и поселки
 *  13) zip — Почтовый индекс. Работает только при contentType = building. В этом случае можно не передать parentId. Поиск по почтовому индексу — это поиск по строениям (building), поэтому логично указать withParent = 1 и limit = 1, чтоб выбрать данные о регионе, нас. пункте и т.п.
 *    Например: http://kladr-api.ru/api.php?contentType=building&limit=1&withParent=1&zip=163000
 *    oneString — Поиск адреса одной строкой в свободной форме. С этим параметром используются:
 *  14) query — строка поиска
 *  15) withParent=1 — выводить сведения о родителях
 *  16) limit — кол-во результатов в выдаче
 *  17) regionId, districtId, cityId — фильтры для ограничения поиск
 *    Например: http://kladr-api.ru/api.php?query=%D0%BC%D0%BE%D1%81%D0%BA%D0%B2%D0%B0&oneString=1&limit=1&withParent=1
 *  18) callback – JavaScript метод которому будет передан ответ базы
 *
 *  */

@Component({
  selector: 'app-address-kladr',
  templateUrl: './address-kladr.component.html',
  styleUrls: ['./address-kladr.component.scss']
})
export class AddressKladrComponent extends ReactiveForm
  implements OnInit, OnDestroy {
  @Input()
  public address: Address = new Address();
  @Output()
  public addressChange = new EventEmitter();

  public addressGroup: FormGroup;
  private subject: Subscription = new Subscription();

  public apartmentOFFCtrl = new FormControl();

  public regionCtrl = new FormControl();
  public cityCtrl = new FormControl();
  public streetCtrl = new FormControl();
  public buildingCtrl = new FormControl();
  public apartmentCtrl = new FormControl();
  public zipCtrl = new FormControl();

  public filteredRegionList: Observable<AddressModel[]>;
  public filteredCityList: Observable<AddressModel[]>;
  public filteredStreetList: Observable<AddressModel[]>;
  public filteredBuildingList: Observable<AddressModel[]>;
  /**
   * Субъекты вызова нужного сервиса при изменении модели
   */
  private callerEmmiter: Subject<AddressEmmiter> = new Subject<AddressEmmiter>();

  private regionId: string = '';
  private cityId: string = '';
  private streetId: string = '';

  constructor(private formBuildfer: FormBuilder, private kladr: KladrService) {
    super();
    this.addressGroup = this.formBuildfer.group([{
      buildingId: [{ value: this.buildingCtrl.value }],
      streetId: [{ value: this.streetCtrl.value }],
      cityId: [{ value: this.cityCtrl.value }],
      apartment: [{ value: this.apartmentCtrl.value }],
      zip: [{ value: this.zipCtrl.value }],
      apartmentOFF: [{ value: this.apartmentOFFCtrl.value }]
    }]);

    this.registrySubscription();
  }

  private _filterStates(sourseList: AddressModel[], value: string): any[] {
    const filterValue = value.toLowerCase();

    return sourseList.filter(
      (item: AddressModel) => item.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  protected registrySubscription(): void {
    if (this.addressGroup) {
      this.subject.add(this.addressGroup.valueChanges.subscribe((values: any) => {
        this.address = new Address(values);
        this.addressChange.emit(this.address);
      }));
      this.subject.add(this.apartmentOFFCtrl.valueChanges.subscribe((value: any) =>
        value ? this.apartmentCtrl.reset({ value: '', disabled: true }) : this.apartmentCtrl.reset({ value: '', disabled: false })
      ));
    }
  }


  // TODO сделать передачу параметров для улицы, строения
  ngOnInit() {
    this.callerEmmiter
      .pipe(debounceTime(1000)) // wait 1 sec after the last event before emitting last event
      .pipe(distinctUntilChanged()) // only emit if value is different from previous value
      .subscribe(emmiter => {
        const queryId: string = this[emmiter.parentId] ? this[emmiter.parentId] : '';
        this.subject.add(this.kladr
          .load(emmiter.type, {
            id: queryId,
            query: emmiter.query
          })
          .subscribe((res: SimpleResult<AddressModel[]>) => {
            if (res && res.result) {
              const firstElementAddress: AddressModel = res && res.result && res.result[0] || null;
              if (firstElementAddress) {
                this[emmiter.currentId] = firstElementAddress && firstElementAddress.id || '';
              }

              this[emmiter.filteredListName] = from(
                this[emmiter.formControllerName].valueChanges.pipe(
                  startWith(''),
                  map(item =>
                    item
                      ? this._filterStates(res.result, (<string>item))
                      : res.result
                  )
                )
              );
              this.zipCtrl.setValue(firstElementAddress && firstElementAddress.zip && firstElementAddress.zip);
            }
          }));
      });
  }

  ngOnDestroy(): void {
    if (this.subject && !this.subject.closed) {
      this.subject.unsubscribe();
    }
    if (this.callerEmmiter) {
      this.callerEmmiter.unsubscribe();
    }
  }

  public loadRegion(event: any) {
    this.regionId = '';
    console.log('event = ' + event);
    const test: AddressEmmiter = {
      query: event,
      parentId: '',
      currentId: 'regionId',
      type: AddressItemType.region,
      filteredListName: 'filteredRegionList',
      formControllerName: 'regionCtrl'
    };
    this.callerEmmiter.next(test);
  }

  public loadCity(event: any) {
    this.cityId = '';
    console.log('event = ' + event);
    const test: AddressEmmiter = {
      query: event,
      parentId: 'regionId',
      currentId: 'cityId',
      type: AddressItemType.city,
      filteredListName: 'filteredCityList',
      formControllerName: 'cityCtrl'
    };
    this.callerEmmiter.next(test);
  }

  public loadStreet(event: any) {
    this.streetId = '';
    console.log('event = ' + event);
    const test: AddressEmmiter = {
      query: event,
      parentId: 'cityId',
      currentId: 'streetId',
      type: AddressItemType.street,
      filteredListName: 'filteredStreetList',
      formControllerName: 'streetCtrl'
    };
    this.callerEmmiter.next(test);
  }

  public loadBuilding(event: any) {
    console.log('event = ' + event);
    const test: AddressEmmiter = {
      query: event,
      parentId: 'streetId',
      currentId: '',
      type: AddressItemType.building,
      filteredListName: 'filteredBuildingList',
      formControllerName: 'buildingCtrl'
    };
    this.callerEmmiter.next(test);
  }

}
