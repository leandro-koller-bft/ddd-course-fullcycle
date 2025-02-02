import IEventHandler from "./event-handler.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default interface IEventDispatch {
  notify(event: EventInterface): void;
  register(eventName: string, handler: EventHandlerInterface): void;
  unregister(eventName: string, handler: EventHandlerInterface): void;
  unregisterAll(): void;
}
