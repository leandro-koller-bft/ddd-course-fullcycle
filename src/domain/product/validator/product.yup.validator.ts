import * as yup from "yup";
import ValidatorInterface from "../../@shared/validator/validator.interface";
import {
  ID_IS_REQUIRED,
  NAME_IS_REQUIRED,
  PRICE_IS_NEGATIVE,
  PRICE_IS_REQUIRED,
  PRODUCT_CONTEXT,
} from "../../../constants";
import IProduct from "../entities/product.interface";

export default class CustomerYupValidator
  implements ValidatorInterface<IProduct>
{
  validate(entity: IProduct): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required(ID_IS_REQUIRED),
          name: yup.string().required(NAME_IS_REQUIRED),
          price: yup.number().required(PRICE_IS_REQUIRED).moreThan(0, PRICE_IS_NEGATIVE)
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },
          { abortEarly: false }
        );
    } catch (err) {
      const e = err as yup.ValidationError;

      e.errors.forEach((error) => {
        entity.notification.addError({
          context: PRODUCT_CONTEXT,
          message: error,
        });
      });
    }
  }
}
