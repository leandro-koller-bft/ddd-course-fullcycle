import RepositoryInterface from "../../@shared/repositories/repository-interface";
import IProduct from "../entities/product.interface";

export default interface IProductRepository
  extends RepositoryInterface<IProduct> {}
