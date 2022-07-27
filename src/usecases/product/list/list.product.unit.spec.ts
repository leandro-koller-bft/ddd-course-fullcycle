import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const productA = ProductFactory.create("a", "Product A", 4)
const productB = ProductFactory.create("a", "Product B", 3)

const mockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([productA, productB])),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit Test list product use case", () => {
  it("should list products", async () => {
    const repository = mockRepository();
    const useCase = new ListProductUseCase(repository);
    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);
    
    expect(output.products[0].id).toBe(productA.id);
    expect(output.products[0].name).toBe(productA.name);
    expect(output.products[0].price).toBe(productA.price);

    expect(output.products[1].id).toBe(productB.id);
    expect(output.products[1].name).toBe(productB.name);
    expect(output.products[1].price).toBe(productB.price);
  });
});
