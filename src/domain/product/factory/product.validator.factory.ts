import ValidatorInterface from "../../@shared/validator/validator.interface";
import IProduct from "../entities/product.interface";
import ProductYupValidator from "../validator/product.yup.validator";

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<IProduct> {
    return new ProductYupValidator();
  }
}
