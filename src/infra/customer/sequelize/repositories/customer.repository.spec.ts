import { Sequelize } from "sequelize-typescript";
import { CUSTOMER_NOT_FOUND } from "../../../../constants";
import Customer from "../../../../domain/customer/entities/customer";
import Address from "../../../../domain/customer/entities/value-objects/address";
import CustomerModel from "../models/customer.model";
import CustomerRepository from "./customer.repository";

describe("Product repository tests", () => {
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

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 1, "1", "City 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);
    const customerModel = await CustomerModel.findOne({
      where: { id: customer.id },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zip: address.zip,
      city: address.city,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 1, "1", "City 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);
    const customerModel = await CustomerModel.findOne({
      where: { id: customer.id },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zip: address.zip,
      city: address.city,
    });

    const otherAddress = new Address("Street 2", 2, "2", "City 2");

    customer.changeName("new name");
    customer.changeAddress(otherAddress);
    customer.reward(10);
    customer.reward(15);
    await customerRepository.update(customer);

    const customerModelUp = await CustomerModel.findOne({
      where: { id: customer.id },
    });

    expect(customerModelUp.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: otherAddress.street,
      number: otherAddress.number,
      zip: otherAddress.zip,
      city: otherAddress.city,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Product 1");
    const address = new Address("Street 1", 1, "1", "City 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);
    const foundCustomer = await customerRepository.find(customer.id);

    expect(customer).toEqual(foundCustomer);
  });

  it("should find a customer with no address", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Product 1");

    await customerRepository.create(customer);
    const foundCustomer = await customerRepository.find(customer.id);

    expect(customer).toEqual(foundCustomer);
  });

  it("should throw an error when a customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("xpto");
    }).rejects.toThrow(CUSTOMER_NOT_FOUND);
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "1", "City 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customer2 = new Customer("2", "Customer 2");
    const address2 = new Address("Street 2", 2, "2", "City 2");
    customer2.changeAddress(address2);

    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll()

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer)
    expect(customers).toContainEqual(customer2)
  });

  // describe("Events-related tests", () => {
  //   it("should notify when a customer is created", async () => {
  //     const eventDispatcher = new EventDispatcher();
  //     const firstEventHandler = new SendFirstMessageWhenCustomerIsCreated();
  //     const secondEventHandler = new SendSecondMessageWhenCustomerIsCreated();
  //     const spyFirstEventHandler = jest.spyOn(firstEventHandler, "handle");
  //     const spySecondEventHandler = jest.spyOn(secondEventHandler, "handle");

  //     eventDispatcher.register(CUSTOMER_CREATED_EVENT, firstEventHandler);
  //     eventDispatcher.register(CUSTOMER_CREATED_EVENT, secondEventHandler);

  //     expect(eventDispatcher.getEventHandlers[CUSTOMER_CREATED_EVENT].length).toBe(
  //       2
  //     );

  //     const customerRepository = new CustomerRepository();
  //     const customer = new Customer("c1", "Customer 1");
  //     const address = new Address("Street 1", 1, "1", "City 1");
  //     customer.changeAddress(address);
  
  //     await customerRepository.create(customer);
  //     const customerModel = await CustomerModel.findOne({
  //       where: { id: customer.id },
  //     });
  
  //     expect(customerModel.toJSON()).toStrictEqual({
  //       id: customer.id,
  //       name: customer.name,
  //       active: customer.isActive(),
  //       rewardPoints: customer.rewardPoints,
  //       street: address.street,
  //       number: address.number,
  //       zip: address.zip,
  //       city: address.city,
  //     });

  //     expect(spyFirstEventHandler).toHaveBeenCalled();
  //     expect(spySecondEventHandler).toHaveBeenCalled();
  //   });
  // })
});
