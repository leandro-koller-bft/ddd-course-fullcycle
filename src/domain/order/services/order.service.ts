import Order from "../entities/order";
import { v4 as uuid } from "uuid";
import Customer from "../../customer/entities/customer";
import OrderItem from "../entities/order_item";
import { ITEMS_QUANTITY_NOT_VALID } from "../../../constants";

export default class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error(ITEMS_QUANTITY_NOT_VALID);
    }

    const order = new Order(uuid(), customer.id, items);
    customer.reward(order.total() / 2);

    return order;
  }

  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }
}
