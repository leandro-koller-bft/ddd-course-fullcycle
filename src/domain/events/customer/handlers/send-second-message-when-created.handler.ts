import IEventHandler from "../../shared/interfaces/event-handler.interface";
import EventInterface from "../../shared/interfaces/event.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendSecondMessageWhenCustomerIsCreated
  implements IEventHandler<CustomerCreatedEvent>
{
  handle(event: EventInterface): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated');
  }
}
