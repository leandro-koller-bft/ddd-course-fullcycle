import {
  CITY_IS_REQUIRED,
  NUMBER_IS_REQUIRED,
  STREET_IS_REQUIRED,
  ZIP_IS_REQUIRED,
} from "../../../../constants";

export default class Address {
  private _street: string;
  private _number: number;
  private _zip: string;
  private _city: string;

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;
    this.validate();
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error(STREET_IS_REQUIRED);
    }

    if (this._number === 0) {
      throw new Error(NUMBER_IS_REQUIRED);
    }

    if (this._zip.length === 0) {
      throw new Error(ZIP_IS_REQUIRED);
    }

    if (this._city.length === 0) {
      throw new Error(CITY_IS_REQUIRED);
    }
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._zip}, ${this._city}`;
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get zip(): string {
    return this._zip;
  }

  get city(): string {
    return this._city;
  }
}
