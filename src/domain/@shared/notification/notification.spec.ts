import Notification from "./notification";

describe("Unit Test for notifications", () => {
  it("should create errors", () => {
    const contexts = ["customer", "order"];
    const notification = new Notification();
    const error = {
      message: "error message",
      context: contexts[0],
    };

    notification.addError(error);
    expect(notification.messages(contexts[0])).toBe(
      `${contexts[0]}: error message`
    );

    const error2 = {
      message: "error message2",
      context: contexts[0],
    };

    notification.addError(error2);
    expect(notification.messages(contexts[0])).toBe(
      `${contexts[0]}: error message, ${contexts[0]}: error message2`
    );

    const error3 = {
      message: "error message3",
      context: contexts[1],
    };

    notification.addError(error3);
    expect(notification.messages(contexts[1])).toBe(
      `${contexts[1]}: error message3`
    );

    expect(notification.messages()).toBe(
      `${contexts[0]}: error message, ${contexts[0]}: error message2, ${contexts[1]}: error message3`
    );
  });

  it("should check if notification has at least one error", () => {
    const context = "customer";
    const notification = new Notification();
    const error = {
      message: "error message",
      context,
    };

    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);
  });

  it("should get all errors props", () => {
    const context = "customer";
    const notification = new Notification();
    const error = {
      message: "error message",
      context,
    };

    notification.addError(error);

    expect(notification.errors).toEqual([error]);
  });
});
