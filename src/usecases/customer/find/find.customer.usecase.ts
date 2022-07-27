import repositoryInterface from "../../../domain/@shared/repositories/repository-interface";
import customerInterface from "../../../domain/customer/entities/customer.interface";
import ICustomerRepository from "../../../domain/customer/repositories/customer-repository.interface";
import UseCaseInterface from "../../usecase.interface";
import ICustomerUseCase from "../customer.usecase.interface";
import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from "./find.customer.dto";

export default class FindCustomerUseCase implements ICustomerUseCase {
  readonly repository: ICustomerRepository;

  constructor(repository: ICustomerRepository) {
    this.repository = repository;
  }

  async execute({ id }: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const customer = await this.repository.find(id);

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
