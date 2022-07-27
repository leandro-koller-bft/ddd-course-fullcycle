import Address from "../../../domain/customer/entities/value-objects/address";
import ICustomerRepository from "../../../domain/customer/repositories/customer-repository.interface";
import ICustomerUseCase from "../customer.usecase.interface";
import {
  InputUpdateCustomerDto,
  OutputUpdateCustomerDto,
} from "./update.customer.dto";

export default class UpdateCustomerUseCase implements ICustomerUseCase {
  readonly repository: ICustomerRepository;

  constructor(repository: ICustomerRepository) {
    this.repository = repository;
  }

  async execute({
    id,
    name,
    address,
  }: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
    const customer = await this.repository.find(id);

    customer.changeName(name);
    customer.changeAddress(
      new Address(address.street, address.number, address.zip, address.city)
    );
    await this.repository.update(customer);

    return {
      id: id,
      name: name,
      address: address,
    };
  }
}
