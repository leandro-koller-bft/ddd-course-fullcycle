import Address from "../../../domain/customer/entities/value-objects/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import ListCustomerUseCase from "./list.customer.usecase";

const customerA = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("Street A", 4, "zipA", "City A")
);
const customerB = CustomerFactory.createWithAddress(
  "Joan Doa",
  new Address("Street B", 3, "zipB", "City B")
);

const mockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([customerA, customerB])),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit Test list customer use case", () => {
  it("should list customers", async () => {
    const repository = mockRepository();
    const useCase = new ListCustomerUseCase(repository);
    const output = await useCase.execute({});

    expect(output.customers.length).toBe(2);
    
    expect(output.customers[0].id).toBe(customerA.id);
    expect(output.customers[0].name).toBe(customerA.name);
    expect(output.customers[0].address.street).toBe(customerA.address.street);

    expect(output.customers[1].id).toBe(customerB.id);
    expect(output.customers[1].name).toBe(customerB.name);
    expect(output.customers[1].address.street).toBe(customerB.address.street);
  });
});
