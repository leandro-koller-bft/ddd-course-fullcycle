import EventInterface from "./event.interface";

export default interface IEventHandler<
  T extends EventInterface = EventInterface
> {
  handle(event: T): void;
}
