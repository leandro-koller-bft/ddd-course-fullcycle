import * as yup from "yup";
import ValidatorInterface from "../../@shared/validator/validator.interface";
import {
  CITY_IS_REQUIRED,
  CUSTOMER_CONTEXT,
  NUMBER_IS_REQUIRED,
  STREET_IS_REQUIRED,
  ZIP_IS_REQUIRED,
} from "../../../constants";
import IAddress from "../entities/value-objects/address.interface";

export default class AddressYupValidator
  implements ValidatorInterface<IAddress>
{
  validate(entity: IAddress): void {
    try {
      yup
        .object()
        .shape({
          street: yup.string().required(STREET_IS_REQUIRED),
          number: yup.number().required(NUMBER_IS_REQUIRED),
          city: yup.string().required(CITY_IS_REQUIRED),
          zip: yup.string().required(ZIP_IS_REQUIRED),
        })
        .validateSync(
          {
            street: entity.street,
            number: entity.number,
            city: entity.city,
            zip: entity.zip,
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
