import Product from "../entities/product";
import RepositoryInterface from "../../@shared/repositories/repository-interface";

export default interface IProductRepository
  extends RepositoryInterface<Product> {}
