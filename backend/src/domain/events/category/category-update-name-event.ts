import CategoryID from "domain/entities/category/category-id";
import { DomainEvent } from "../domain-event";


/**
 * Domain event representing the update of a category's name.
 * 
 * Captures the identifier and the new name of the category,
 * as well as the timestamp of when the update occurred.
 */
export default class CategoryUpdateNameEvent implements DomainEvent {

    /** The unique identifier of the category. */
    public readonly id: CategoryID;

    /** The updated name of the category. */
    public readonly name: string;

    /** The date and time when the event occurred. */
    public readonly dateTimeOccurred: Date;

    /**
     * Private constructor to enforce the use of the factory method.
     * 
     * @param id - The category ID.
     * @param name - The updated category name.
     * @param dateTimeOccurred - The timestamp when the event occurred.
     */
    private constructor(id: CategoryID, name: string, dateTimeOccurred: Date) {
        this.id = id;
        this.name = name;
        this.dateTimeOccurred = dateTimeOccurred;
    }

    /**
     * Factory method to create a new `CategoryUpdateNameEvent`.
     * Automatically sets the current timestamp.
     * 
     * @param id - The category ID.
     * @param name - The updated name.
     * @returns A new instance of `CategoryUpdateNameEvent`.
     */
    public static create(id: CategoryID, name: string): CategoryUpdateNameEvent {
        return new CategoryUpdateNameEvent(id, name, new Date());
    }
}