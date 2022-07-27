import Address from "../../../domain/customer/entities/value-objects/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import ICustomerRepository from "../../../domain/customer/repositories/customer-repository.interface";
import ICustomerUseCase from "../customer.usecase.interface";
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from "./create.customer.dto";

export default class CreateCustomerUseCase implements ICustomerUseCase {
  readonly repository: ICustomerRepository;

  constructor(repository: ICustomerRepository) {
    this.repository = repository;
  }

  async execute({
    name,
    address,
  }: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAddress(
      name,
      new Address(address.street, address.number, address.zip, address.city)
    );

    await this.repository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        zip: customer.address.zip,
      },
    };
  }
}
