import ValidatorInterface from "../../@shared/validator/validator.interface";
import ICustomer from "../entities/customer.interface";
import CustomerYupValidator from "../validator/customer.yup.validator";

export default class CustomerValidatorFactory {
  static create(): ValidatorInterface<ICustomer> {
    return new CustomerYupValidator();
  }
}
