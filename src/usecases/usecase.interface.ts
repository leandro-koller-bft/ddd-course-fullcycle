export default interface UseCaseInterface<T> {
  readonly repository: T
  execute(inputDto: any): Promise<any>;
}