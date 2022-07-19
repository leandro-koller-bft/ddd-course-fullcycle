import Address from "./domain/entities/address";
import Customer from "./domain/entities/customer";
import Order from "./domain/entities/order";
import OrderItem from "./domain/entities/order_item";

let customer = new Customer("123", "Wesley Williams");
const address = new Address("Rua dois", 2, "12345-678", "São Paulo");

customer.address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, "o1", 1);
const item2 = new OrderItem("2", "Item 2", 15, "o2", 1);

const order = new Order("1", "123", [item1, item2]);
