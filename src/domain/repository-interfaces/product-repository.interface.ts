import Product from "../entities/product";
import RepositoryInterface from "./repository-interface";

export default interface IProductRepository
  extends RepositoryInterface<Product> {}
