import { Sequelize } from "sequelize-typescript";
import { ORDER_NOT_FOUND } from "../../constants";
import Address from "../../domain/entities/address";
import Customer from "../../domain/entities/customer";
import Order from "../../domain/entities/order";
import OrderItem from "../../domain/entities/order_item";
import Product from "../../domain/entities/product";
import CustomerModel from "../db/sequelize/models/customer.model";
import OrderItemModel from "../db/sequelize/models/order-item.model";
import OrderModel from "../db/sequelize/models/order.model";
import ProductModel from "../db/sequelize/models/product.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";

describe("Order repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 1, "1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const order = new Order("123", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: orderItem.productId,
          order_id: order.id,
        },
      ],
    });
  });

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 1, "1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const order = new Order("123", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const anotherCustomer = new Customer("c2", "Customer 2");
    anotherCustomer.changeAddress(address);
    await customerRepository.create(anotherCustomer);

    order.changeCustomer(anotherCustomer.id);
    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: anotherCustomer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: orderItem.productId,
          order_id: order.id,
        },
      ],
    });

    const anotherProduct = new Product("2", "Product 2", 100);
    await productRepository.create(anotherProduct);

    const anotherOrderItem = new OrderItem(
      "2",
      anotherProduct.name,
      anotherProduct.price,
      anotherProduct.id,
      1
    );

    order.addItem(anotherOrderItem);
    orderItem.changeQuantity(5);
    order.changeItem(orderItem);

    await orderRepository.update(order);

    const orderModel2 = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel2.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: anotherCustomer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: orderItem.productId,
          order_id: order.id,
        },
        {
          id: anotherOrderItem.id,
          name: anotherOrderItem.name,
          price: anotherOrderItem.price,
          quantity: anotherOrderItem.quantity,
          product_id: anotherOrderItem.productId,
          order_id: order.id,
        },
      ],
    });
  });

  it("should throw an error when order is not found", () => {
    expect(async () => {
      const orderRepository = new OrderRepository();

      await orderRepository.find("xpto");
    }).rejects.toThrow(ORDER_NOT_FOUND);
  });

  it("should return a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 1, "1", "City 1");

    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const order = new Order("123", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();

    await orderRepository.create(order);
    const foundOrder = await orderRepository.find(order.id);

    expect(foundOrder).toEqual(order);
  });

  it("should return orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 1, "1", "City 1");

    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const orderItem1 = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const orderItem2 = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      6
    );

    const order1 = new Order("123", customer.id, [orderItem1]);
    const order2 = new Order("234", customer.id, [orderItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const foundOrders = await orderRepository.findAll();

    expect(foundOrders).toEqual([order1, order2]);
  });
});
