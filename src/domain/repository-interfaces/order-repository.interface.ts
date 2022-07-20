import Order from "../entities/order";
import RepositoryInterface from "./repository-interface";

export default interface IOrderRepository
  extends RepositoryInterface<Order> {}
