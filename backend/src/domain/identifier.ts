import ValueObject from "./value-object";

/**
 * Represents a unique identifier for an entity or aggregate in Domain-Driven Design (DDD).
 * 
 * This class extends `ValueObject` and provides identity equality logic, ensuring that
 * two identifiers are equal if and only if their values are equal.
 * 
 * @template ID - The type of the identifier value.
 */
export default abstract class Identifier<ID> extends ValueObject {

    /** The underlying value of the identifier. */
    private readonly _value: ID;

    /**
     * Creates a new `Identifier` with the given value.
     * 
     * @param value - The raw identifier value (e.g., a UUID string).
     */
    constructor(value: ID) {
        super();
        this._value = value;
    }

    /**
     * Returns the value of the identifier.
     */
    get value(): ID {
        return this._value;
    }

    /**
     * Checks if this identifier is equal to another.
     * 
     * @param other - The other identifier to compare with.
     * @returns `true` if both identifiers have the same value; otherwise, `false`.
     */
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
