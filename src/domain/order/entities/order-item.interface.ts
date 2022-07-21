export default interface IOrderItem {
  get id(): string;
  get name(): string;
  get price(): number;
  get quantity(): number;
  get productId(): string;
}