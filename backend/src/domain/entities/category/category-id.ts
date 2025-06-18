import Identifier from "../../identifier";
import { validate, v4 as uuid } from "uuid";

/**
 * Represents a unique identifier (UUID) for a category.
 * 
 * This class encapsulates a valid UUID and ensures the format's integrity
 * by using factory methods to create or validate a category ID.
 * 
 * Example usage:
 * ```ts
 * const id1 = CategoryID.unique(); // generates a new UUID
 * const id2 = CategoryID.from("fa47b44c-e7c5-11ec-8fea-0242ac120002"); // creates from an existing UUID
 * ```
 */
export default class CategoryID extends Identifier<string> {

    /**
     * Creates an instance of `CategoryID` with the given UUID.
     * The constructor is private to enforce the use of factory methods.
     * 
     * @param id - UUID in string format.
     */
    private constructor(private readonly id: string) {
        super(id);
    }

    /**
     * Generates a new `CategoryID` with a valid and unique UUID.
     * 
     * @returns A new instance of `CategoryID` with a generated UUID.
     */
    public static unique(): CategoryID {
        return new CategoryID(uuid());
    }

    /**
     * Creates a `CategoryID` from an existing UUID string.
     * 
     * @param id - UUID in string format.
     * @throws Error if the provided UUID is invalid.
     * @returns A valid instance of `CategoryID`.
     */
    public static from(id: string): CategoryID {
        if (!validate(id))
            throw new Error("Invalid UUID format");
        return new CategoryID(id);
    }
}
