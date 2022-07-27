export type NotificationErrorProps = {
  message: string;
  context: string;
};

export default class Notification {
  private _errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps) {
    this._errors.push(error);
  }

  hasErrors(context?: string): boolean {
    let errors = this._errors;

    if (context) {
      errors = errors.filter((e) => e.context === context);
    }

    return errors.length > 0;
  }

  get errors(): NotificationErrorProps[] {
    return this._errors;
  }

  messages(context?: string): string {
    let msgs = "";

    if (context) {
      msgs = this._errors
        .filter((e) => e.context === context)
        .map((e) => `${e.context}: ${e.message}`)
        .join(", ");
    } else {
      msgs = this._errors.map((e) => `${e.context}: ${e.message}`).join(", ");
    }

    return msgs;
  }
}
