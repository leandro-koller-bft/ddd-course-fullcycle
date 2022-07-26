import Address from "../../../domain/customer/entities/value-objects/address";
import ICustomerRepository from "../../../domain/customer/repositories/customer-repository.interface";
import ICustomerUseCase from "../customer.usecase.interface";
import {
  InputUpdateCustomerDto,
  OutputUpdateCustomerDto,
} from "./update.customer.dto";

export default class UpdateCustomerUseCase implements ICustomerUseCase {
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(
    input: InputUpdateCustomerDto
  ): Promise<OutputUpdateCustomerDto> {
    const customer = await this.customerRepository.find(input.id);

    customer.changeName(input.name);
    customer.changeAddress(
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city
      )
    );
    await this.customerRepository.update(customer);

    return {
      id: input.id,
      name: input.name,
      address: input.address,
    };
  }
}
