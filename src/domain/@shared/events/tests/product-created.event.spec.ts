import { PRODUCT_CREATED_EVENT } from "../../../../constants";
import SendEmailWhenProductIsCreatedHandler from "../../../product/events/handlers/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../../product/events/product-created.event";
import EventDispatcher from "../event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register(PRODUCT_CREATED_EVENT, eventHandler);

    expect(
      eventDispatcher.getEventHandlers[PRODUCT_CREATED_EVENT]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers[PRODUCT_CREATED_EVENT].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers[PRODUCT_CREATED_EVENT][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register(PRODUCT_CREATED_EVENT, eventHandler);
    expect(
      eventDispatcher.getEventHandlers[PRODUCT_CREATED_EVENT][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister(PRODUCT_CREATED_EVENT, eventHandler);

    expect(
      eventDispatcher.getEventHandlers[PRODUCT_CREATED_EVENT]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers[PRODUCT_CREATED_EVENT].length).toBe(
      0
    );
  });

  it("should unregister all", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register(PRODUCT_CREATED_EVENT, eventHandler);
    expect(
      eventDispatcher.getEventHandlers[PRODUCT_CREATED_EVENT][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers[PRODUCT_CREATED_EVENT]).toBe(
      undefined
    );
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register(PRODUCT_CREATED_EVENT, eventHandler);
    expect(
      eventDispatcher.getEventHandlers[PRODUCT_CREATED_EVENT][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10,
      createdAt: new Date(),
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
