export default interface UseCaseInterface<T> {
  execute: (inputDto: any) => Promise<any>;
}