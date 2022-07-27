import {
  ADDRESS_IS_MANDATORY,
  CUSTOMER_CONTEXT,
  ID_IS_REQUIRED,
  NAME_IS_REQUIRED,
} from "../../../constants";
import Address from "./value-objects/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw an error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "John");
    }).toThrowError(ID_IS_REQUIRED);
  });

  it("should throw an error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError(NAME_IS_REQUIRED);
  });

  it("should throw two errors when id and name is empty", () => {
    expect(() => {
      let customer = new Customer("", "");
    }).toThrowError(
      `${CUSTOMER_CONTEXT}: ${ID_IS_REQUIRED}, ${CUSTOMER_CONTEXT}: ${NAME_IS_REQUIRED}`
    );
  });

  it("should change name", () => {
    let customer = new Customer("123", "John");
    customer.changeName("Jane");

    expect(customer.name).toBe("Jane");
  });

  // triple-A test
  it("should change name", () => {
    let customer = new Customer("123", "John"); // Arrange
    customer.changeName("Jane"); // Act

    expect(customer.name).toBe("Jane"); // Assert
  });

  it("should activate costumer", () => {
    let customer = new Customer("123", "John");

    customer.changeAddress(new Address("1st Street", 2, "3", "City 4"));
    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate costumer", () => {
    let customer = new Customer("123", "John");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should not activate costumer when address is undefined", () => {
    expect(() => {
      let customer = new Customer("123", "John");
      customer.activate();
    }).toThrowError(ADDRESS_IS_MANDATORY);
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.reward(10);
    expect(customer.rewardPoints).toBe(10);

    customer.reward(5);
    expect(customer.rewardPoints).toBe(15);
  });
});
