import CategoryID from "../../entities/category/category-id";
import { DomainEvent } from "../domain-event";


/**
 * Domain event representing the creation of a category.
 * 
 * Captures the identifier and name of the category at the time of creation,
 * along with the timestamp of when the event occurred.
 */
export class CategoryCreatedEvent implements DomainEvent {

    private readonly _id: CategoryID;
    private readonly _name: string;

    /** The date and time when the event occurred. */
    public readonly dateTimeOccurred: Date;

    /**
     * Private constructor to enforce the use of the factory method.
     * 
     * @param id - The unique identifier of the created category.
     * @param name - The name of the created category.
     * @param dateTimeOccurred - The timestamp when the event occurred.
     */
    private constructor(id: CategoryID, name: string, dateTimeOccurred: Date) {
        this._id = id;
        this._name = name;
        this.dateTimeOccurred = dateTimeOccurred;
    }

    /**
     * Factory method to create a new `CategoryCreatedEvent`.
     * Automatically sets the current timestamp.
     * 
     * @param id - The category ID.
     * @param name - The category name.
     * @returns A new instance of `CategoryCreatedEvent`.
     */
    public static create(id: CategoryID, name: string): CategoryCreatedEvent {
        return new CategoryCreatedEvent(id, name, new Date());
    }
}