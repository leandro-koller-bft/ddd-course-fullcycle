import express, { Request, Response } from "express";
import { InputCreateProductDto } from "../../../usecases/product/create/create.product.dto";
import { InputListProductDto } from "../../../usecases/product/list/list.product.dto";
import CreateProductUseCase from "../../../usecases/product/create/create.product.usecase";
import ListProductUseCase from "../../../usecases/product/list/list.product.usecase";
import ProductRepository from "../../product/sequelize/repositories/product.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());

  try {
    const productDto: InputCreateProductDto = {
      type: req.body.type,
      name: req.body.name,
      price: req.body.price,
    };
    const output = await usecase.execute(productDto);

    res.send(output);
  } catch (err) {
    res.status(400).send(err);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());

  try {
    const productDto: InputListProductDto = {};
    const output = await usecase.execute(productDto);

    res.send(output);
  } catch (err) {
    res.status(400).send(err);
  }
});
