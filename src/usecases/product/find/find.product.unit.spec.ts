import {
  NAME_IS_REQUIRED,
  PRICE_IS_NEGATIVE,
  PRODUCT_NOT_FOUND,
} from "../../../constants";
import Product from "../../../domain/product/entities/product";
import FindProductUseCase from "./find.product.usecase";

const id = "123";
const name = "Product One";
const price = 12.9;
const product = new Product(id, name, price);
const input = { id };

const mockRepository = () => ({
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit Test find product use case", () => {
  it("should find a product", async () => {
    const repository = mockRepository();
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
    const repository = mockRepository();
    repository.find.mockImplementation(() => {
      throw new Error(PRODUCT_NOT_FOUND);
    });
    const useCase = new FindProductUseCase(repository);

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow(PRODUCT_NOT_FOUND);
  });
});
