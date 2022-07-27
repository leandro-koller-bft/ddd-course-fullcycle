import productRepositoryInterface from "../../../domain/product/repositories/product-repository.interface";
import IProductUseCase from "../product.usecase.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase implements IProductUseCase {
  readonly repository: productRepositoryInterface;

  constructor(repository: productRepositoryInterface) {
    this.repository = repository;
  }

  async execute({ id }: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this.repository.find(id);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
