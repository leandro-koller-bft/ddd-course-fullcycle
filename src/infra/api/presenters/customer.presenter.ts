import { toXML } from "jstoxml";
import { XML_HEADER } from "../../../constants";
import { OutputListCustomerDto } from "../../../usecases/customer/list/list.customer.dto";

export default class CustomerPresenter {
  static listXml(data: OutputListCustomerDto): string {
    const xmlOptions = {
      header: true,
      indent: "  ",
      newline: "\n",
      allowEmpty: true,
    };

    return toXML(
      {
        customers: data.customers.map(({ id, name, address }) => ({
          id,
          name,
          address,
        })),
      },
      xmlOptions
    );
  }
}
