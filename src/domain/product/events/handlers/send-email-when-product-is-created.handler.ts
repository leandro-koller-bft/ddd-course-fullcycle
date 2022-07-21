import IEventHandler from "../../../@shared/events/interfaces/event-handler.interface";
import EventInterface from "../../../@shared/events/interfaces/event.interface";
import ProductCratedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler
  implements IEventHandler<ProductCratedEvent>
{
  handle(event: EventInterface): void {
    console.log('sending email to...');
  }
}
