import {
  ID_IS_REQUIRED,
  NAME_IS_REQUIRED,
  PRICE_IS_NEGATIVE,
  PRODUCT_CONTEXT,
} from "../../../constants";
import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import IProduct from "./product.interface";

export default class Product extends Entity implements IProduct {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
    this.checkErrors();
  }

  checkErrors() {
    if (this.notification.hasErrors(PRODUCT_CONTEXT)) {
      throw new NotificationError(this.notification.errors);
    }
  }

  validate() {
    if (this._id.length === 0) {
      this.notification.addError({
        context: PRODUCT_CONTEXT,
        message: ID_IS_REQUIRED,
      });
    }

    if (this._name.length === 0) {
      this.notification.addError({
        context: PRODUCT_CONTEXT,
        message: NAME_IS_REQUIRED,
      });
    }

    if (this._price < 0) {
      this.notification.addError({
        context: PRODUCT_CONTEXT,
        message: PRICE_IS_NEGATIVE,
      });
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

  get id(): string {
    return this._id;
  }
}
