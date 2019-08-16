import { AddressItem } from './../../classes/address/address-item.class';
import { AddressModel } from './model/address.model';
import { KladrService } from 'src/app/services/kladr-service/kladr.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveForm } from 'src/app/classes/reactive-form';
import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  startWith
} from 'rxjs/operators';

import { AddressEmmiter, AddressItemType } from './model/address-emiter.model';
import { Component, OnInit, Input, OnDestroy, Output } from '@angular/core';
import { Address } from 'src/app/classes/address/address.class';
import { Subscription, Observable, Subject, from } from 'rxjs';
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
  @Output()
  public address: Address = new Address();

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
  private buildingId: string = '';

  private addressList: AddressModel[] = [];

  constructor(private kladr: KladrService) {
    super();
    this.registrySubscription();
  }
  protected registrySubscription(): void {
    this.subject.add(this.apartmentOFFCtrl.valueChanges.subscribe((value: any) =>
      value ? this.resetControllerValue(this.apartmentCtrl, '', true) : this.resetControllerValue(this.apartmentCtrl)
    ));
  }

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
              this.addressList = res && res.result;
              const firstElementAddress: AddressModel = res && res.result && res.result[0] || null;
              if (firstElementAddress) {
                this[emmiter.currentId] = firstElementAddress && firstElementAddress.id || '';
              }

              this[emmiter.filteredListName] = from(
                this[emmiter.formControllerName].valueChanges.pipe(
                  startWith(''),
                  map((value: AddressModel) => typeof value === 'string' ? value : value.name),
                  map((name: string) => name ? this._filter(name) : this.addressList.slice())
                )
              );
              // хреновый код - ПЕРЕДЕЛАТЬ!!!
              const value1: string = firstElementAddress && AddressItemType[firstElementAddress.contentType].toString();
              const value2: string = AddressItemType.street.toString();
              if (value1 === value2) {
                this.zipCtrl
                  .setValue(firstElementAddress && firstElementAddress.zip && firstElementAddress.zip);
              }
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

  private _filter(name: string): AddressModel[] {
    const filterValue = name.toLowerCase();
    return this.addressList.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  /**
   * Метод по сбросу значения у контроллера
   * @param controller контроллер, чье значение стоит сбросить
   */
  private resetControllerValue(
    controller: FormControl
    , controllerValue: string = ''
    , isDisable: boolean = false
  ) {
    if (controller) {
      controller.reset({ value: controllerValue, disabled: isDisable });
    }
  }

  /**
   * Метод очистки зависимых дочерних контроллеров, относительно текущего
   * @param formControllerList список контроллеров
   */
  private clearChildAddressItem(...formControllerList: FormControl[]) {
    if (formControllerList) {
      formControllerList.forEach(
        (controller: FormControl) => this.resetControllerValue(controller)
      );
    }
  }

  /**
   * Метод заполнения единицы адреса
   * @param event событие с DOM
   */
  private fillAddressContentByEvent(event: any) {
    if (event && event.name) {
      if (!this.address) {
        this.address = new Address();
      }
      const typeAddress: string = event.contentType.toString();
      switch (typeAddress) {
        case 'region': {
          this.address.$region = new AddressItem(event);
          this.clearChildAddressItem(
            this.cityCtrl
            , this.streetCtrl
            , this.buildingCtrl
            , this.apartmentCtrl
            , this.apartmentOFFCtrl
            , this.zipCtrl
          );
          break;
        }
        case 'district': {
          break;
        }
        case 'city': {
          this.address.$city = new AddressItem(event);
          this.clearChildAddressItem(
            this.streetCtrl
            , this.buildingCtrl
            , this.apartmentCtrl
            , this.apartmentOFFCtrl
            , this.zipCtrl
          );
          break;
        }
        case 'street': {
          this.address.$street = new AddressItem(event);
          this.clearChildAddressItem(
            this.buildingCtrl
            , this.apartmentCtrl
            , this.apartmentOFFCtrl
            , this.zipCtrl
          );
          break;
        }
        case 'building': {
          this.address.$building = new AddressItem(event);
          this.clearChildAddressItem(
            this.apartmentCtrl
            , this.apartmentOFFCtrl
          );
          break;
        }
      }
      console.log('building addres res = ', this.address);
    }
  }

  /**
   *
   * Метод заполнения эмитера с заполнением и последующим вызовом события
   *
   * @param query строка, пользовательский запрос
   * @param parentIdName строка, уникальный идентификатор родительской сущности (для региона - ничего,
   * для города - регион, для улицы - город, и т.д.)
   * @param currentIdName строка, текущий уникальный идентификатор, то что будем заполнять в соответствии
   * с ответом
   * @param addressItemType перечисление, тип того, что пытаемся найти
   * @param filteredListName список, куда будем возвращать список
   * @param formControllerName форм-контрол, имя контроллера, куда будет записан выбор
   * пользователя на интерфейсе
   */
  private fillAddressEmitterAndCallEmmit(query: string, parentIdName: string, currentIdName: string,
    addressItemType: AddressItemType, filteredListName: string, formControllerName: string) {
    const test: AddressEmmiter = {
      query: query,
      parentId: parentIdName,
      currentId: currentIdName,
      type: addressItemType,
      filteredListName: filteredListName,
      formControllerName: formControllerName
    };
    this.callerEmmiter.next(test);
  }

  /**
   * Метод по загрузке списка регионов, согласно запрашиваемому названию
   * @param event название региона, или модель региона
   */
  public loadRegion(event: any) {
    this.fillAddressContentByEvent(event);
    event = event && event.name || event;
    this.regionId = '';
    this.fillAddressEmitterAndCallEmmit(
      event,
      '',
      'regionId',
      AddressItemType.region,
      'filteredRegionList',
      'regionCtrl'
    );
  }

  /**
   * Метод по загрузке списка городов, согласно запрашиваемому названию
   * @param event название города, или модель города
   */
  public loadCity(event: any) {
    this.fillAddressContentByEvent(event);
    event = event && event.name || event;
    this.cityId = '';
    this.fillAddressEmitterAndCallEmmit(
      event,
      'regionId',
      'cityId',
      AddressItemType.city,
      'filteredCityList',
      'cityCtrl'
    );
  }

  /**
   * Метод по загрузке списка улиц, согласно запрашиваемому названию
   * @param event название улицы, или модель улицы
   */
  public loadStreet(event: any) {
    this.fillAddressContentByEvent(event);
    event = event && event.name || event;
    this.streetId = '';
    this.fillAddressEmitterAndCallEmmit(
      event,
      'cityId',
      'streetId',
      AddressItemType.street,
      'filteredStreetList',
      'streetCtrl'
    );
  }


  /**
   * Метод по загрузке списка домов, согласно запрашиваемому названию (номеру)
   * @param event номер дома, или модель дома
   */
  public loadBuilding(event: any) {
    this.fillAddressContentByEvent(event);
    event = event && event.name || event;
    this.fillAddressEmitterAndCallEmmit(
      event,
      'streetId',
      'buildingId',
      AddressItemType.building,
      'filteredBuildingList',
      'buildingCtrl'
    );
  }

  /**
   * Внутри этой функции у нас область видимости АВТОКОМПЛИТА
   * @param address
   */
  public displayAddressItem(address?: AddressModel) {
    return address ? address.name : undefined;
  }

}
