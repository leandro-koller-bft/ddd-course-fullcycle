import { ORDER_NOT_FOUND } from "../../../../constants";
import Order from "../../../../domain/order/entities/order";
import OrderItem from "../../../../domain/order/entities/order_item";
import IOrderRepository from "../../../../domain/order/repositories/order-repository.interface";
import OrderItemModel from "../models/order-item.model";
import OrderModel from "../models/order.model";

export default class OrderRepository implements IOrderRepository {
  async create(entity: Order): Promise<void> {
    try {
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
    } catch (err) {
      console.log(err);
    }
  }

  async update(entity: Order): Promise<void> {
    try {
      const order = await OrderModel.findOne({
        where: {
          id: entity.id,
        },
      });
      const newItems = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      }));

      order.update({
        customer_id: entity.customerId,
        total: entity.total(),
        items: newItems,
      });

      const savedItems = await OrderItemModel.findAll({
        where: { order_id: entity.id },
      });

      for (const item of newItems) {
        const savedItem = savedItems.find((i) => i.id === item.id);

        if (savedItem) {
          await savedItem.update(item, { where: { id: item.id } });
          savedItem.save();
        } else {
          await OrderItemModel.create(item);
        }
      }

      order.save();
    } catch (err) {
      console.log(err);
    }
  }

  async find(id: string): Promise<Order> {
    try {
      const order = await OrderModel.findOne({
        where: { id },
        include: [{ model: OrderItemModel }],
      });

      return new Order(
        order.id,
        order.customer_id,
        order.items.map(
          (i) => new OrderItem(i.id, i.name, i.price, i.product_id, i.quantity)
        )
      );
    } catch (err) {
      throw new Error(ORDER_NOT_FOUND);
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      const orders = await OrderModel.findAll({
        include: { model: OrderItemModel },
      });

      return orders.map(
        (o) =>
          new Order(
            o.id,
            o.customer_id,
            o.items.map(
              (i) =>
                new OrderItem(i.id, i.name, i.price, i.product_id, i.quantity)
            )
          )
      );
    } catch (err) {
      console.log(err);
    }
  }
}
