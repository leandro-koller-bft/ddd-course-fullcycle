import {
  NAME_IS_REQUIRED,
  PRICE_IS_NEGATIVE,
} from "../../../constants";
import CreateProductUseCase from "./create.product.usecase";

const name = "Product One";
const price = 12.9;
const input = {
  type: "a",
  name,
  price,
};

const mockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit Test create product use case", () => {
  it("should create a product", async () => {
    const repository = mockRepository();
    const useCase = new CreateProductUseCase(repository);
    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw an error when name is missing", async () => {
    const customerRepository = mockRepository();
    const useCase = new CreateProductUseCase(customerRepository);

    expect(async () => {
      await useCase.execute({ ...input, name: "" });
    }).rejects.toThrow(NAME_IS_REQUIRED);
  });

  it("should throw an error when street is missing", async () => {
    const customerRepository = mockRepository();
    const useCase = new CreateProductUseCase(customerRepository);

    expect(async () => {
      await useCase.execute({ ...input, price: -3 });
    }).rejects.toThrow(PRICE_IS_NEGATIVE);
  });
});
