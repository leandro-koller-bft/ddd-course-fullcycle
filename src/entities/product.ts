import {
  ID_IS_REQUIRED,
  NAME_IS_REQUIRED,
  PRICE_IS_NEGATIVE,
} from "../constants";

export default class Product {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error(ID_IS_REQUIRED);
    }

    if (this._name.length === 0) {
      throw new Error(NAME_IS_REQUIRED);
    }

    if (this._price < 0) {
      throw new Error(PRICE_IS_NEGATIVE);
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changePrice(price: number) {
    this._price = price;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }
}
