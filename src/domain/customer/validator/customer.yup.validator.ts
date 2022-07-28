import * as yup from "yup";
import ValidatorInterface from "../../@shared/validator/validator.interface";
import ICustomer from "../entities/customer.interface";
import {
  CUSTOMER_CONTEXT,
  ID_IS_REQUIRED,
  NAME_IS_REQUIRED,
} from "../../../constants";

export default class CustomerYupValidator
  implements ValidatorInterface<ICustomer>
{
  validate(entity: ICustomer): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required(ID_IS_REQUIRED),
          name: yup.string().required(NAME_IS_REQUIRED),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
          },
          { abortEarly: false }
        );
    } catch (err) {
      const e = err as yup.ValidationError;

      e.errors.forEach((error) => {
        entity.notification.addError({
          context: CUSTOMER_CONTEXT,
          message: error,
        });
      });
    }
  }
}
