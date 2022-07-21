import IEventHandler from "../../../@shared/events/interfaces/event-handler.interface";
import EventInterface from "../../../@shared/events/interfaces/event.interface";
import CustomerChangedAddressEvent from "../customer-changed-address.events";

export default class SendNewAddress
  implements IEventHandler<CustomerChangedAddressEvent>
{
  handle(event: EventInterface): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`
    );
  }
}
