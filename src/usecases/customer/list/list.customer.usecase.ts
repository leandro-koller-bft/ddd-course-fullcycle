import ICustomer from "../../../domain/customer/entities/customer.interface";
import ICustomerRepository from "../../../domain/customer/repositories/customer-repository.interface";
import ICustomerUseCase from "../customer.usecase.interface";
import {
  InputListCustomerDto,
  OutputListCustomerDto,
} from "./list.customer.dto";

export default class ListCustomerUseCase implements ICustomerUseCase {
  private customerRepository: ICustomerRepository;
  
  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();
    
    return OutputMapper.toOutput(customers);
  }
}


class OutputMapper {
  static toOutput(customer: ICustomer[]): OutputListCustomerDto {
    return {
      customers: customer.map(customer => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          city: customer.address.city,
          zip: customer.address.zip,
        }
      }))
    }
  }
}