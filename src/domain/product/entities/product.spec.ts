import {
  ID_IS_REQUIRED,
  NAME_IS_REQUIRED,
  PRICE_IS_NEGATIVE,
  PRODUCT_CONTEXT,
} from "../../../constants";
import Product from "./product";

describe("Customer unit tests", () => {
  it("should throw an error when id is empty", () => {
    expect(() => {
      const product = new Product("", "product", 100);
    }).toThrowError(ID_IS_REQUIRED);
  });

  it("should throw an error when name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 100);
    }).toThrowError(NAME_IS_REQUIRED);
  });

  it("should throw two errors when id and name is empty", () => {
    expect(() => {
      let customer = new Product("", "", 1);
    }).toThrowError(
      `${PRODUCT_CONTEXT}: ${ID_IS_REQUIRED}, ${PRODUCT_CONTEXT}: ${NAME_IS_REQUIRED}`
    );
  });

  it("should throw an error when price is negative", () => {
    expect(() => {
      const product = new Product("123", "product", -1);
    }).toThrowError(PRICE_IS_NEGATIVE);
  });

  it("should change product's name", () => {
    const product = new Product("123", "product", 100);
    product.changeName("new name");

    expect(product.name).toBe("new name");
  });

  it("should change product's price", () => {
    const product = new Product("123", "product", 100);
    product.changePrice(200);

    expect(product.price).toBe(200);
  });
});
