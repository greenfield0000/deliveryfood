
export enum AddressItemType {
  region,
  district,
  city,
  street,
  building
}

export interface AddressEmmiter {
  query: string;
  parentId: string;
  currentId: string;
  type: AddressItemType;
  filteredListName: string;
  formControllerName: string;
}
