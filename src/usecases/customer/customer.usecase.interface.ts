import ICustomerRepository from "../../domain/customer/repositories/customer-repository.interface";
import UseCaseInterface from "../usecase.interface";

export default interface ICustomerUseCase extends UseCaseInterface<ICustomerRepository> {}
