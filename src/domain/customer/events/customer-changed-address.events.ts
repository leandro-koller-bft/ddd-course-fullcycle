import EventInterface from "../../@shared/events/interfaces/event.interface";

export default class CustomerChangedAddressEvent implements EventInterface {
  dateTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
