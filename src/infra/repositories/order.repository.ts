import Order from "../../domain/entities/order";
import IOrderRepository from "../../domain/repository-interfaces/order-repository.interface";
import OrderItemModel from "../db/sequelize/models/order-item.model";
import OrderModel from "../db/sequelize/models/order.model";

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
  find(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
}
