import {
  CUSTOMER_ID_IS_REQUIRED,
  ID_IS_REQUIRED,
  ITEMS_QUANTITY_NOT_VALID,
  PRICE_IS_NEGATIVE,
  QUANTITY_IS_NEGATIVE_OR_ZERO,
} from "../../../constants";
import Order from "./order";
import OrderItem from "./order-item";

describe("Customer unit tests", () => {
  it("should throw an error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrowError(ID_IS_REQUIRED);
  });

  it("should throw an error when customerId is empty", () => {
    expect(() => {
      let order = new Order("123", "", []);
    }).toThrowError(CUSTOMER_ID_IS_REQUIRED);
  });

  it("should throw an error when items is empty", () => {
    expect(() => {
      let order = new Order("123", "123", []);
    }).toThrowError(ITEMS_QUANTITY_NOT_VALID);
  });

  it("should calculate total correctly", () => {
    const product1 = new OrderItem("1", "product1", 12, "p1", 2);
    const product2 = new OrderItem("2", "product2", 14, "p1", 4);
    let order = new Order("123", "123", [product1, product2]);

    expect(order.total()).toBe(product1.total() + product2.total());

    order = new Order("123", "123", [product1]);

    expect(order.total()).toBe(product1.total());
  });

  it("should throw error if some item's price is smaller than zero", () => {
    expect(() => {
      const product1 = new OrderItem("1", "product1", -12, "p1", 2);
      new Order("123", "123", [product1]);
    }).toThrowError(PRICE_IS_NEGATIVE);
  });

  it("should throw error if some item's quantity is smaller or equal than zero", () => {
    expect(() => {
      const product1 = new OrderItem("1", "product1", 12, "p1", 0);
      new Order("123", "123", [product1]);
    }).toThrowError(QUANTITY_IS_NEGATIVE_OR_ZERO);
  });
});
