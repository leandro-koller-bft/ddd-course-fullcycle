import { CUSTOMER_NOT_FOUND } from "../../../constants";
import Customer from "../../../domain/customer/entities/customer";
import Address from "../../../domain/customer/entities/value-objects/address";
import FindCustomerUseCase from "./find.customer.usecase";

const id = "123";
const name = "John Doe";
const address = new Address("street", 123, "zip", "city");
const customer = new Customer(id, name);
customer.changeAddress(address);

const mockRepository = () => ({
  find: jest.fn().mockReturnValue(Promise.resolve(customer)),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Test find  a customer use case", () => {
  it("should find a customer", async () => {
    const repository = mockRepository();
    const useCase = new FindCustomerUseCase(repository);

    const input = { id };
    const output = {
      id,
      name,
      address: {
        street: address.street,
        number: address.number,
        city: address.city,
        zip: address.zip,
      },
    };
    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a customer", async () => {
    const customerRepository = mockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error(CUSTOMER_NOT_FOUND);
    });
    const useCase = new FindCustomerUseCase(customerRepository);
    const input = { id };

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow(CUSTOMER_NOT_FOUND);
  });
});
