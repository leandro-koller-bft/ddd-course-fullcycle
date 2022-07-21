import {
  CUSTOMER_ID_IS_REQUIRED,
  ID_IS_REQUIRED,
  ITEMS_QUANTITY_NOT_VALID,
  PRICE_IS_NEGATIVE,
  QUANTITY_IS_NEGATIVE_OR_ZERO,
} from "../../../constants";
import OrderItem from "./order-item";

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

  changeCustomer(customerId: string) {
    this._customerId = customerId;
  }

  addItem(item: OrderItem) {
    this._items.push(item);
  }

  changeItem(item: OrderItem) {
    this._items = this._items.map((i) => {
      if (i.id === item.id) {
        return item;
      }

      return i;
    });
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }
}
