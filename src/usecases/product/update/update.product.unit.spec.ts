import { NAME_IS_REQUIRED } from "../../../constants";
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "product", 30);
const name = "Product Up";
const id = product.id;
const price = 3;
const input = {
  id,
  name,
  price,
};
const mockRepository = () => ({
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit Test update product use case", () => {
  it("should update a product", async () => {
    const repository = mockRepository();
    const useCase = new UpdateProductUseCase(repository);
    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name,
      price,
    });
  });
});
