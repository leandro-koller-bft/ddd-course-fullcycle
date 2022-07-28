import ValidatorInterface from "../../@shared/validator/validator.interface";
import IAddress from "../entities/value-objects/address.interface";
import AddressYupValidator from "../validator/address.yup.validator";

export default class AddressValidatorFactory {
  static create(): ValidatorInterface<IAddress> {
    return new AddressYupValidator();
  }
}
