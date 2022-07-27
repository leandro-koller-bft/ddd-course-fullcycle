import ProductFactory from "../../../domain/product/factory/product.factory";
import IProductRepository from "../../../domain/product/repositories/product-repository.interface";
import IProductUseCase from "../product.usecase.interface";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";

export default class CreateProductUseCase implements IProductUseCase {
  readonly repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  async execute({
    type,
    name,
    price,
  }: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create(type, name, price);

    await this.repository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
