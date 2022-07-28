import IAddress from "./address.interface";
import Notification from "../../../@shared/notification/notification";
import AddressValidatorFactory from "../../factory/address.validator.factory";
import NotificationError from "../../../@shared/notification/notification.error";
import { CUSTOMER_CONTEXT } from "../../../../constants";

export default class Address implements IAddress {
  private _street: string;
  private _number: number;
  private _zip: string;
  private _city: string;

  readonly notification: Notification;

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;
    this.notification = new Notification();
    this.validate();
    this.checkErrors();
  }

  checkErrors() {
    if (this.notification.hasErrors(CUSTOMER_CONTEXT)) {
      throw new NotificationError(this.notification.errors);
    }
  }

  validate() {
    AddressValidatorFactory.create().validate(this);
  }

  toString(): string {
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
