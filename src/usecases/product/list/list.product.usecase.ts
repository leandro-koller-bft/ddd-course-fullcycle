import IProduct from "../../../domain/product/entities/product.interface";
import productRepositoryInterface from "../../../domain/product/repositories/product-repository.interface";
import IProductUseCase from "../product.usecase.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase implements IProductUseCase {
  readonly repository: productRepositoryInterface;

  constructor(repository: productRepositoryInterface) {
    this.repository = repository;
  }

  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.repository.findAll();

    return OutputMapper.toOutput(products);
  }
}

class OutputMapper {
  static toOutput(customer: IProduct[]): OutputListProductDto {
    return {
      products: customer.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
      })),
    };
  }
}
