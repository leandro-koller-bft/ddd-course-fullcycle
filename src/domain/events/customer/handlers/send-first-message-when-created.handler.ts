import IEventHandler from "../../shared/interfaces/event-handler.interface";
import EventInterface from "../../shared/interfaces/event.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendFirstMessageWhenCustomerIsCreated
  implements IEventHandler<CustomerCreatedEvent>
{
  handle(event: EventInterface): void {
    console.log('Esse é o primeiro console.log do evento: CustomerCreated');
  }
}
