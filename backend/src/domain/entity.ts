import Identifier from "./identifier";
import ValidationHandler from "./validation/validation-handler";

/**
 * Represents a generic domain entity in Domain-Driven Design (DDD).
 * 
 * An `Entity` is an object that is defined by its identity rather than its attributes.
 * It contains a unique identifier and requires a validation implementation.
 * 
 * @template ID - The type of the identifier, which must extend `Identifier`.
 */
export default abstract class Entity<ID extends Identifier<ID>> {

    /** The unique identifier of the entity. */
    private readonly _id: ID;

    /**
     * Creates a new entity with the given identifier.
     * 
     * @param id - The unique identifier of the entity.
     * @throws Will throw an error if the identifier is null or undefined.
     */
    constructor(id: ID) {
        if (!id) throw new Error("'id' should not be null");
        this._id = id;
    }

    /**
     * Validates the entity using the provided validation handler.
     * 
     * @param handler - The validation handler to collect validation errors.
     */
    abstract validate(handler: ValidationHandler): void;

    /**
     * Returns the unique identifier of the entity.
     */
    get id(): ID {
        return this._id;
    }

    /**
     * Compares this entity to another entity by their identifiers.
     * 
     * @param other - The other entity to compare with.
     * @returns `true` if both entities have the same identifier; otherwise, `false`.
     */
    public equals(other?: Entity<ID>): boolean {
        if (other === null || other === undefined) {
            return false;
        }
        if (!(other instanceof Entity)) {
            return false;
        }
        return this._id.value.equals(other._id.value);
    }
}
