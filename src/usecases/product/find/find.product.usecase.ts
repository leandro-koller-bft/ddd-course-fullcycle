import { PRODUCT_NOT_FOUND } from "../../../constants";
import productRepositoryInterface from "../../../domain/product/repositories/product-repository.interface";
import IProductUseCase from "../product.usecase.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase implements IProductUseCase {
  readonly repository: productRepositoryInterface;

  constructor(repository: productRepositoryInterface) {
    this.repository = repository;
  }

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    try {
      const product = await this.repository.find(input.id);

      return {
        id: product.id,
        name: product.name,
        price: product.price,
      };
    } catch (err) {
      console.log(err);

      throw new Error(PRODUCT_NOT_FOUND);
    }
  }
}
