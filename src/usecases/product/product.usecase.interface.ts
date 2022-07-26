import IProductRepository from "../../domain/product/repositories/product-repository.interface";
import UseCaseInterface from "../usecase.interface";

export default interface IProductUseCase extends UseCaseInterface<IProductRepository> {}
