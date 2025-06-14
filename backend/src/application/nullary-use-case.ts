export interface NullaryUseCase<OUT> {

    execute(): Promise<OUT>;
}