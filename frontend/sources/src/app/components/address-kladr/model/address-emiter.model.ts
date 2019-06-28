
export enum AddressItemType {
  region,
  district,
  city,
  street,
  building
}

export interface AddressEmmiter {
  query: string;
  id: string;
  type: AddressItemType;
  filteredListName: string;
  formControllerName: string;
}
