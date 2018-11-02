export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoLoaction;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface GeoLoaction {
  lat: string;
  lng: string;
}
