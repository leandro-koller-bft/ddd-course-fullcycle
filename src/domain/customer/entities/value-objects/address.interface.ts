import Notification from "../../../@shared/notification/notification";

export default interface IAddress {
  get street(): string
  get number(): number
  get city(): string
  get zip(): string

  toString: () => string;

  readonly notification: Notification;
}