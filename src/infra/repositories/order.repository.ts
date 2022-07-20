import Order from "../../domain/entities/order";
import IOrderRepository from "../../domain/repository-interfaces/order-repository.interface";
import OrderItemModel from "../db/sequelize/models/order-item.model";
import OrderModel from "../db/sequelize/models/order.model";

export default class OrderRepository implements IOrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  update(entity: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }
  find(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
}
