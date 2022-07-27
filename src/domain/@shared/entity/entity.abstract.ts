import Notification from "../notification/notification";

export default abstract class Entity {
  protected _id: string;
  readonly notification: Notification;

  constructor() {
    this.notification = new Notification();
  }
}
