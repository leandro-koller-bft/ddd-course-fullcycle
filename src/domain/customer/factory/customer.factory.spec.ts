import Address from "../entities/value-objects/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {
  it("should create a customer", () => {
    const name = "John";
    const customer = CustomerFactory.create(name);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe(name);
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const name = "John";
    const address = new Address("street", 1, "zip", "city")
    let customer = CustomerFactory.createWithAddress(name, address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe(name);
    expect(customer.address).toBeDefined();
  });
});
