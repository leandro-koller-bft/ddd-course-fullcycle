import Order from "../entities/order";
import RepositoryInterface from "../../@shared/repositories/repository-interface";

export default interface IOrderRepository
  extends RepositoryInterface<Order> {}
