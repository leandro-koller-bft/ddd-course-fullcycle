import { Sequelize } from "sequelize-typescript";
import {
  NAME_IS_REQUIRED,
  PRICE_IS_NEGATIVE,
  PRODUCT_NOT_FOUND,
} from "../../../constants";
import Product from "../../../domain/product/entities/product";
import ProductModel from "../../../infra/product/sequelize/models/product.model";
import ProductRepository from "../../../infra/product/sequelize/repositories/product.repository";
import FindProductUseCase from "./find.product.usecase";

const id = "123";
const name = "Product One";
const price = 12.9;
const input = { id };

describe("Integration Test find product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const repository = new ProductRepository();
    const product = new Product(id, name, price);
    await repository.create(product);

    const useCase = new FindProductUseCase(repository);
    const output = {
      id,
      name,
      price,
    };
    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a product", async () => {
    const repository = new ProductRepository();
    const product = new Product(id, name, price);
    await repository.create(product);

    const useCase = new FindProductUseCase(repository);

    expect(() => {
      return useCase.execute({ ...input, id: "321" });
    }).rejects.toThrow(PRODUCT_NOT_FOUND);
  });
});
