import { NAME_IS_REQUIRED, STREET_IS_REQUIRED } from "../../../constants";
import CreateCustomerUseCase from "./create.customer.usecase";

const name = "John Doe";
const address = {
  street: "Street",
  number: 123,
  city: "city",
  zip: "zip",
};
const input = {
  name,
  address,
};

const mockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe("Unit Test create customer use case", () => {
  it("should create a customer", async () => {
    const customerRepository = mockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);
    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: input.address,
    });
  });

  it("should throw an error when name is missing", async () => {
    const customerRepository = mockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    input.name = "";

    expect(async () => {
      await useCase.execute(input);
    }).rejects.toThrow(NAME_IS_REQUIRED);
  });

  it("should throw an error when street is missing", async () => {
    const customerRepository = mockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    input.name = name;
    input.address.street = "";

    expect(async () => {
      await useCase.execute(input);
    }).rejects.toThrow(STREET_IS_REQUIRED);
  });
});
