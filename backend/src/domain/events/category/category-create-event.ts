import CategoryID from "../../entities/category/category-id";
import { DomainEvent } from "../domain-event";


export class CategoryCreatedEvent implements DomainEvent {

    private readonly _id: CategoryID;
    private readonly _name: string;
    public readonly dateTimeOccurred: Date;    

    private constructor(id: CategoryID, name: string, dateTimeOccurred: Date) {
        this._id = id;
        this._name = name;
        this.dateTimeOccurred = dateTimeOccurred;
    }

    public static create(id: CategoryID, name: string): CategoryCreatedEvent {
        return new CategoryCreatedEvent(id, name, new Date());
    }
}