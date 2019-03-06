import { FormBuilder, FormGroup } from '@angular/forms';
import { Address } from '../../classes/address';
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ReactiveForm } from 'src/app/classes/reactive-form';

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
export class AddressKladrComponent extends ReactiveForm implements OnInit, OnDestroy {

  @Input()
  public address: Address = new Address();
  @Output()
  public addressChange = new EventEmitter();

  private addressGroup: FormGroup;
  private subject: Subscription;

  constructor(private formBuildfer: FormBuilder) {
    super();
    this.addressGroup = this.formBuildfer.group({
      buildingId: this.address.$buildingId,
      streetId: this.address.$streetId,
      cityId: this.address.$cityId
    });

    this.registrySubscription();
  }

  protected registrySubscription(): void {
    if (this.addressGroup) {
      this.subject = this.addressGroup.valueChanges.subscribe((values: any) => {
        this.address = new Address(values);
        this.addressChange.emit(this.address);
      });
    }
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    if (this.subject && !this.subject.closed) {
      this.subject.unsubscribe();
    }
  }

}
