import { HttpConstant } from 'src/app/constants/http-constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SimpleResult } from 'src/app/utils/simple-result.class';
import { RouteConstant } from 'src/app/constants/route-constant';
import { AddressItemType } from 'src/app/components/address-kladr/model/address-emiter.model';

/**
 * Сервис для работы с кладром
 */
@Injectable({
  providedIn: 'root'
})
export class KladrService {
  constructor(private _http: HttpClient) {}

  public load(type: AddressItemType, params: any = {}) {
    const query: string = (params && params.query) || 'Мос';
    const id: number = (params && params.id) || 0;

    switch (type) {
      case AddressItemType.region: {
        return this.loadRegion(query);
        break;
      }
      case AddressItemType.district: {
        return this.loadDistrict(query, id);
        break;
      }
      case AddressItemType.city: {
        return this.loadCity(query, id);
        break;
      }
      case AddressItemType.street: {
        return this.loadStreet(query, id);
        break;
      }
      case AddressItemType.building: {
        return this.loadBuilding(query, id);
        break;
      }
    }
  }

  /**
   * Метод загрузки региона
   * @param findQuery строка поиска
   */
  public loadRegion(findQuery: String) {
    const params = { query: findQuery };
    return this._http.post<SimpleResult<any>>(
      RouteConstant.kladr_location + '/getRegion',
      params,
      HttpConstant.HTTP_OPTIONS
    );
  }

  /**
   * Метод загрузки города
   * @param findQuery строка поиска
   * @param findRegionId уникальный идентификатор региона
   */
  public loadDistrict(findQuery: String, findRegionId: number) {
    const params = { query: findQuery, regionId: findRegionId };
    return this._http.post<SimpleResult<any>>(
      RouteConstant.kladr_location + '/getDistrict',
      params,
      HttpConstant.HTTP_OPTIONS
    );
  }

  /**
   * Метод загрузки города
   * @param findQuery строка поиска
   * @param findRegionId уникальный идентификатор региона
   */
  public loadCity(findQuery: String, findDistrict: number) {
    const params = { query: findQuery, districtId: findDistrict };
    return this._http.post<SimpleResult<any>>(
      RouteConstant.kladr_location + '/getCity',
      params,
      HttpConstant.HTTP_OPTIONS
    );
  }

  /**
   * Метод загрузки улицы
   * @param findQuery строка поиска
   * @param findCityId уникальный идентификатор города
   */
  public loadStreet(findQuery: String, findCityId: number) {
    const params = { query: findQuery, cityId: findCityId };
    return this._http.post<SimpleResult<any>>(
      RouteConstant.kladr_location + '/getStreet',
      params,
      HttpConstant.HTTP_OPTIONS
    );
  }

  /**
   * Метод загрузки строения/корпуса
   * @param findQuery строка поиска
   * @param findStreetId уникальный идентификатор улицы
   */
  public loadBuilding(findQuery: String, findStreetId: number) {
    const params = { query: findQuery, streetId: findStreetId };
    return this._http.post<SimpleResult<any>>(
      RouteConstant.kladr_location + '/getBuilding',
      params,
      HttpConstant.HTTP_OPTIONS
    );
  }
}
