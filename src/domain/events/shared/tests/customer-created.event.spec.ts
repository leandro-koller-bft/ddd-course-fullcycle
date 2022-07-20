import CustomerCreatedEvent from "../../customer/customer-created.event";
import SendFirstMessageWhenCustomerIsCreated from "../../customer/handlers/send-first-message-when-created.handler";
import SendSecondMessageWhenCustomerIsCreated from "../../customer/handlers/send-second-message-when-created.handler";
import { CUSTOMER_CREATED_EVENT } from "../../names";
import EventDispatcher from "../event-dispatcher";

describe("Customer created event tests", () => {
  it("should register both event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const firstEventHandler = new SendFirstMessageWhenCustomerIsCreated();
    const secondEventHandler = new SendSecondMessageWhenCustomerIsCreated();

    eventDispatcher.register(CUSTOMER_CREATED_EVENT, firstEventHandler);
    eventDispatcher.register(CUSTOMER_CREATED_EVENT, secondEventHandler);

    expect(
      eventDispatcher.getEventHandlers[CUSTOMER_CREATED_EVENT]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers[CUSTOMER_CREATED_EVENT].length).toBe(
      2
    );
    expect(
      eventDispatcher.getEventHandlers[CUSTOMER_CREATED_EVENT][0]
    ).toMatchObject(firstEventHandler);
    expect(
      eventDispatcher.getEventHandlers[CUSTOMER_CREATED_EVENT][1]
    ).toMatchObject(secondEventHandler);
  });

  it("should unregister both", () => {
    const eventDispatcher = new EventDispatcher();
    const firstEventHandler = new SendFirstMessageWhenCustomerIsCreated();
    const secondEventHandler = new SendSecondMessageWhenCustomerIsCreated();

    eventDispatcher.register(CUSTOMER_CREATED_EVENT, firstEventHandler);
    eventDispatcher.register(CUSTOMER_CREATED_EVENT, secondEventHandler);

    expect(eventDispatcher.getEventHandlers[CUSTOMER_CREATED_EVENT].length).toBe(
      2
    );

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers[CUSTOMER_CREATED_EVENT]).toBe(
      undefined
    );
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const firstEventHandler = new SendFirstMessageWhenCustomerIsCreated();
    const secondEventHandler = new SendSecondMessageWhenCustomerIsCreated();
    const spyFirstEventHandler = jest.spyOn(firstEventHandler, "handle");
    const spySecondEventHandler = jest.spyOn(secondEventHandler, "handle");
    
    eventDispatcher.register(CUSTOMER_CREATED_EVENT, firstEventHandler);
    eventDispatcher.register(CUSTOMER_CREATED_EVENT, secondEventHandler);

    expect(eventDispatcher.getEventHandlers[CUSTOMER_CREATED_EVENT].length).toBe(
      2
    );

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 1",
      address: "Street 1",
      number: 10,
      createdAt: new Date(),
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyFirstEventHandler).toHaveBeenCalled();
    expect(spySecondEventHandler).toHaveBeenCalled();
  });
});
