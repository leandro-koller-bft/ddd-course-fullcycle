import Customer from "../entities/customer";
import RepositoryInterface from "./repository-interface";

export default interface ICustomerRepository
  extends RepositoryInterface<Customer> {}
