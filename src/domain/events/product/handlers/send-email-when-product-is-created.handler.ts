import IEventHandler from "../../shared/interfaces/event-handler.interface";
import EventInterface from "../../shared/interfaces/event.interface";
import ProductCratedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler
  implements IEventHandler<ProductCratedEvent>
{
  handle(event: EventInterface): void {
    console.log('sanding email to...');
  }
}
