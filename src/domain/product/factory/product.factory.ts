import { v4 as uuid } from "uuid";
import { PRODUCT_TYPE_NOT_SUPPORTED } from "../../../constants";
import Product from "../entities/product";
import ProductB from "../entities/product-b";
import IProduct from "../entities/product.interface";

export default class ProductFactory {
  public static create(type: string, name: string, price: number): IProduct {
    switch (type) {
      case "a":
        return new Product(uuid(), name, price);
      case "b":
        return new ProductB(uuid(), name, price);
      default:
        throw new Error(PRODUCT_TYPE_NOT_SUPPORTED);
    }
  }
}
