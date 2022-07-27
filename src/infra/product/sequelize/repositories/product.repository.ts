import { PRODUCT_NOT_FOUND } from "../../../../constants";
import Product from "../../../../domain/product/entities/product";
import IProductRepository from "../../../../domain/product/repositories/product-repository.interface";
import ProductModel from "../models/product.model";

export default class ProductRepository implements IProductRepository {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Product> {
    try {
      const productModel = await ProductModel.findOne({ where: { id } });

      return new Product(
        productModel.id,
        productModel.name,
        productModel.price
      );
    } catch (err) {
      console.log(err);

      throw new Error(PRODUCT_NOT_FOUND);
    }
  }

  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll();

    return productModels.map((p) => new Product(p.id, p.name, p.price));
  }
}
