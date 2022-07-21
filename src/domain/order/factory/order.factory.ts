import Order from "../entities/order";
import OrderItem from "../entities/order-item";
import IOrder from "../entities/order.interface";

interface IOrderItemFactoryProps {
  id: string;
  name: string;
  productId: string;
  quantity: number;
  price: number;
}

interface IOrderFactoryProps {
  id: string;
  customerId: string;
  items: IOrderItemFactoryProps[];
}

export default class OrderFactory {
  public static create(factoryProps: IOrderFactoryProps): IOrder {
    const items = factoryProps.items.map(
      (i) => new OrderItem(i.id, i.name, i.price, i.productId, i.quantity)
    );

    return new Order(factoryProps.id, factoryProps.customerId, items);
  }
}
