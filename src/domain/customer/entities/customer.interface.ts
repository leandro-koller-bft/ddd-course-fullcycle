import Notification from "../../@shared/notification/notification";
import Address from "./value-objects/address";

export default interface ICustomer {
  get id(): string;
  get name(): string;
  get address(): Address;
  get rewardPoints(): number;

  changeAddress: (address: Address) => void;
  changeName: (name: string) => void;

  readonly notification: Notification;
}
