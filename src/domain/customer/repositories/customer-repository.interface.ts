import RepositoryInterface from "../../@shared/repositories/repository-interface";
import ICustomer from "../entities/customer.interface";

export default interface ICustomerRepository
  extends RepositoryInterface<ICustomer> {}
