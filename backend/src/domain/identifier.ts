import ValueObject from "./value-object";

export default abstract class Identifier<ID> extends ValueObject {

    private readonly _value: ID;

    constructor(value: ID) {
        super();
        this._value = value;
    }

    get value(): ID {
        return this._value;
    }

    public equals(other?: Identifier<ID>): boolean {
        if (other === null || other === undefined) {
            return false;
        }
        if (!(other instanceof Identifier)) {
            return false;
        }
        return this._value === other._value;
    }
}

