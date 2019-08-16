import { AddressItemType } from 'src/app/components/address-kladr/model/address-emiter.model';
export interface AddressModel {
  cadnum: string;
  contentType: AddressItemType;
  guid: string;
  id: string;
  ifnsfl: string;
  ifnsul: string;
  name: string;
  okato: string;
  oktmo: string;
  parentGuid: string;
  type: string;
  typeShort: string;
  zip: number;
}
