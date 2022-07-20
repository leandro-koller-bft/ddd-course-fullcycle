import CustomerChangedAddressEvent from "../../customer/customer-changed-address.events";
import SendNewAddress from "../../customer/handlers/send-new-address.handler";
import { CUSTOMER_CHANGED_ADDRESS_EVENT } from "../../names";
import EventDispatcher from "../event-dispatcher";

describe("Customer changed address event tests", () => {
  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendNewAddress();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    
    eventDispatcher.register(CUSTOMER_CHANGED_ADDRESS_EVENT, eventHandler);

    expect(eventDispatcher.getEventHandlers[CUSTOMER_CHANGED_ADDRESS_EVENT].length).toBe(
      1
    );

    const customerChangedAddressEvent = new CustomerChangedAddressEvent({
      id: "1",
      name: "Customer 1",
      address: "Street 1",
      createdAt: new Date(),
    });

    eventDispatcher.notify(customerChangedAddressEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
