import CategoryID from "domain/entities/category/category-id";
import { DomainEvent } from "../domain-event";


export class CategoryUpdateNameEvent implements DomainEvent {

    private readonly id: CategoryID;
    private readonly name: string;
    public readonly dateTimeOccurred: Date;    

    private constructor(id: CategoryID, name: string, dateTimeOccurred: Date) {
        this.id = id;
        this.name = name;
        this.dateTimeOccurred = dateTimeOccurred;
    }

    public static create(id: CategoryID, name: string): CategoryUpdateNameEvent {
        return new CategoryUpdateNameEvent(id, name, new Date());
    }
}