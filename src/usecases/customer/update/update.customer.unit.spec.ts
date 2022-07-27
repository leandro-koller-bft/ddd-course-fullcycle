import { NAME_IS_REQUIRED, STREET_IS_REQUIRED } from "../../../constants";
import Address from "../../../domain/customer/entities/value-objects/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import UpdateCustomerUseCase from "./update.customer.usecase";

const address = {
  street: "Street Up",
  number: 123,
  city: "city up",
  zip: "zip up",
};
const customer = CustomerFactory.createWithAddress(
  "John Doe",
  new Address(address.street, address.number, address.zip, address.city)
);
const id = customer.id;
const name = "John Up";
const input = {
  id,
  name,
  address,
};
const mockRepository = () => ({
  find: jest.fn().mockReturnValue(Promise.resolve(customer)),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit Test update customer use case", () => {
  it("should update a customer", async () => {
    const customerRepository = mockRepository();
    const useCase = new UpdateCustomerUseCase(customerRepository);
    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: input.address,
    });
  });
});
