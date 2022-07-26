type CustomerDto = {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    city: string;
    zip: string;
  };
};

export interface InputListCustomerDto {}

export interface OutputListCustomerDto {
  customers: CustomerDto[]
}