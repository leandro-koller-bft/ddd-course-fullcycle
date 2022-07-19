import {
  CUSTOMER_ID_IS_REQUIRED,
  ID_IS_REQUIRED,
  ITEMS_QUANTITY_NOT_VALID,
  PRICE_IS_NEGATIVE,
  QUANTITY_IS_NEGATIVE_OR_ZERO,
} from "../../constants";
import OrderItem from "./order_item";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error(ID_IS_REQUIRED);
    }

    if (this._customerId.length === 0) {
      throw new Error(CUSTOMER_ID_IS_REQUIRED);
    }

    if (this._items.length === 0) {
      throw new Error(ITEMS_QUANTITY_NOT_VALID);
    }

    if (this._items.some((item) => item.price < 0)) {
      throw new Error(PRICE_IS_NEGATIVE);
    }

    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error(QUANTITY_IS_NEGATIVE_OR_ZERO);
    }
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.total(), 0);
  }
}
