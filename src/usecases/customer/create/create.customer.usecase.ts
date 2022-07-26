import Address from "../../../domain/customer/entities/value-objects/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import ICustomerRepository from "../../../domain/customer/repositories/customer-repository.interface";
import ICustomerUseCase from "../customer.usecase.interface";
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from "./create.customer.dto";

export default class CreateCustomerUseCase implements ICustomerUseCase {
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(
    input: InputCreateCustomerDto
  ): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAddress(
      input.name,
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city
      )
    );

    await this.customerRepository.create(customer);

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
