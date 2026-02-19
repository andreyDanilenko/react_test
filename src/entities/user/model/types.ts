export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  address: string;
  city: string;
  state?: string;
  stateCode?: string;
  postalCode?: string;
  coordinates?: Coordinates;
  country: string;
}

export interface Hair {
  color: string;
  type: string;
}

export interface Bank {
  cardExpire?: string;
  cardNumber?: string;
  cardType?: string;
  currency?: string;
  iban?: string;
}

export interface Company {
  department?: string;
  name: string;
  title?: string;
  address?: Address;
}

export interface Crypto {
  coin?: string;
  wallet?: string;
  network?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  maidenName?: string;
  age?: number;
  phone?: string;
  birthDate?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  hair?: Hair;
  address?: Address;
  university?: string;
  bank?: Bank;
  company?: Company;
  crypto?: Crypto;
  role?: string;
}
