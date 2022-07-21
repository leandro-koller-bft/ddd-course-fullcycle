import IEventHandler from "../../../@shared/events/interfaces/event-handler.interface";
import EventInterface from "../../../@shared/events/interfaces/event.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendSecondMessageWhenCustomerIsCreated
  implements IEventHandler<CustomerCreatedEvent>
{
  handle(event: EventInterface): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated');
  }
}
