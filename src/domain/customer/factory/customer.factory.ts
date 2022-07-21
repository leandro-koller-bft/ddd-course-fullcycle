import { v4 as uuid } from "uuid";
import Customer from "../entities/customer";
import ICustomer from "../entities/customer.interface";
import Address from "../entities/value-objects/address";

export default class CustomerFactory {
  public static create(name: string): ICustomer {
    return new Customer(uuid(), name);
  }

  public static createWithAddress(name: string, address: Address): ICustomer {
    const customer = this.create(name);
    customer.changeAddress(address);

    return customer;
  }
}
