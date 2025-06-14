
export interface UnitCase<IN> {

    execute(input: IN): Promise<void>;
}