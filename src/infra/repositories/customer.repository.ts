import { CUSTOMER_NOT_FOUND } from "../../constants";
import Address from "../../domain/entities/address";
import Customer from "../../domain/entities/customer";
import ICustomerRepository from "../../domain/repository-interfaces/customer-repository.interface";
import CustomerModel from "../db/sequelize/models/customer.model";

export default class CustomerRepository implements ICustomerRepository {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address?.street,
      number: entity.address?.number,
      zip: entity.address?.zip,
      city: entity.address?.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    if (!!entity.address) {
      entity.activate();
    }

    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address?.street,
        number: entity.address?.number,
        zip: entity.address?.zip,
        city: entity.address?.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      { where: { id: entity.id } }
    );
  }

  async find(id: string): Promise<Customer> {
    let customerModel;

    try {
      customerModel = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      });
    } catch {
      throw new Error(CUSTOMER_NOT_FOUND);
    }

    const customer = new Customer(customerModel.id, customerModel.name);

    if (!!customerModel.street) {
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zip,
        customerModel.city
      );
      customer.changeAddress(address);
    }

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    return customerModels.map((cm) => {
      const customer = new Customer(cm.id, cm.name);
      if (!!cm.street) {
        customer.changeAddress(new Address(cm.street, cm.number, cm.zip, cm.city));
      }

      return customer;
    });
  }
}
