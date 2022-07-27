import express, { Request, Response } from "express";
import { InputCreateCustomerDto } from "../../../usecases/customer/create/create.customer.dto";
import { InputListCustomerDto } from "../../../usecases/customer/list/list.customer.dto";
import CreateCustomerUseCase from "../../../usecases/customer/create/create.customer.usecase";
import ListCustomerUseCase from "../../../usecases/customer/list/list.customer.usecase";
import CustomerRepository from "../../customer/sequelize/repositories/customer.repository";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());

  try {
    const customerDto: InputCreateCustomerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        zip: req.body.address.zip,
      },
    };
    const output = await usecase.execute(customerDto);

    res.send(output);
  } catch (err) {
    res.status(400).send(err);
  }
});

customerRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());

  try {
    const customerDto: InputListCustomerDto = {};
    const output = await usecase.execute(customerDto);

    res.send(output);
  } catch (err) {
    res.status(400).send(err);
  }
});
