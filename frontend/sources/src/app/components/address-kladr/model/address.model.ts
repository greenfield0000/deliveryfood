import { AddressEmmiter } from './address-emiter.model';
export interface AddressModel {
  cadnum: string;
  contentType: AddressEmmiter;
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
