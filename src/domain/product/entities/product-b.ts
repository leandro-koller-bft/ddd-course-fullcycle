import {
  ID_IS_REQUIRED,
  NAME_IS_REQUIRED,
  PRICE_IS_NEGATIVE,
} from "../../../constants";
import Entity from "../../@shared/entity/entity.abstract";
import notification from "../../@shared/notification/notification";
import IProduct from "./product.interface";

export default class ProductB extends Entity implements IProduct {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }
  notification: notification;

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
    return this._price * 2;
  }

  get id(): string {
    return this._id;
  }
}
