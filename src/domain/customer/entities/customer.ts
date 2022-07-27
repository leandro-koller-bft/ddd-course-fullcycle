import {
  ADDRESS_IS_MANDATORY,
  CUSTOMER_CONTEXT,
  ID_IS_REQUIRED,
  NAME_IS_REQUIRED,
} from "../../../constants";
import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ICustomer from "./customer.interface";
import Address from "./value-objects/address";

export default class Customer extends Entity implements ICustomer {
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();
    this.checkErrors();
  }

  checkErrors() {
    if (this.notification.hasErrors(CUSTOMER_CONTEXT)) {
      throw new NotificationError(this.notification.errors);
    }
  }

  validate() {
    if (this.id.length === 0) {
      this.notification.addError({
        context: CUSTOMER_CONTEXT,
        message: ID_IS_REQUIRED,
      });
    }

    if (this._name.length === 0) {
      this.notification.addError({
        context: CUSTOMER_CONTEXT,
        message: NAME_IS_REQUIRED,
      });
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  activate() {
    if (this._address === undefined) {
      this.notification.addError({
        context: CUSTOMER_CONTEXT,
        message: ADDRESS_IS_MANDATORY,
      });
      return this.checkErrors();
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive() {
    return this._active;
  }

  reward(points: number) {
    this._rewardPoints += points;
  }

  get address(): Address {
    return this._address;
  }

  get name(): string {
    return this._name;
  }

  get id(): string {
    return this._id;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }
}
