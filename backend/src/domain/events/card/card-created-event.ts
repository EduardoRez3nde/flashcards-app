import { DomainEvent } from "domain/events/domain-event";
import CardID from "../../entities/card/card-id";

export class CardCreatedEvent implements DomainEvent {

    private readonly _id: CardID;
    private readonly _name: string;
    private readonly _description: string;

    public readonly dateTimeOccurred: Date;

    private constructor(id: CardID, name: string, description: string, dateTimeOccurred: Date) {
        this._id = id;
        this._name = name;
        this._description = description;
        this.dateTimeOccurred = dateTimeOccurred;
    }

    public static create(id: CardID, name: string, description: string): CardCreatedEvent {
        return new CardCreatedEvent(id, name, description, new Date());
    }

    get id(): CardID { return this._id; }
    get name(): string { return this._name; }
    get description(): string { return this._description; }
}
