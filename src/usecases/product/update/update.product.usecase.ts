import productRepositoryInterface from "../../../domain/product/repositories/product-repository.interface";
import IProductUseCase from "../product.usecase.interface";
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from "./update.product.dto";

export default class UpdateProductUseCase implements IProductUseCase {
  readonly repository: productRepositoryInterface;

  constructor(repository: productRepositoryInterface) {
    this.repository = repository;
  }

  async execute({
    id,
    name,
    price,
  }: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this.repository.find(id);

    product.changeName(name);
    product.changePrice(price);

    await this.repository.update(product);

    return {
      id,
      name,
      price,
    };
  }
}
