import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entities/customer";
import Address from "../../../domain/customer/entities/value-objects/address";
import CustomerModel from "../../../infra/customer/sequelize/models/customer.model";
import CustomerRepository from "../../../infra/customer/sequelize/repositories/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find  a customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const id = "123";
    const name = "John Doe";

    const customerRepository = new CustomerRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

    const address = new Address("street", 123, "zip", "city");
    const customer = new Customer(id, name);

    customer.changeAddress(address);
    await customerRepository.create(customer);

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
});
