import Customer from "../entities/customer";
import RepositoryInterface from "../../@shared/repositories/repository-interface";

export default interface ICustomerRepository
  extends RepositoryInterface<Customer> {}
