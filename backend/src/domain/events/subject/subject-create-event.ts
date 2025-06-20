import SubjectID from "domain/entities/subject/subject-id";
import { DomainEvent } from "domain/events/domain-event";

export class SubjectCreatedEvent implements DomainEvent {

    private readonly _id: SubjectID;
    private readonly _name: string;
    private readonly _description: string;

    public readonly dateTimeOccurred: Date;

    private constructor(id: SubjectID, name: string, dateTimeOccurred: Date) {
        this._id = id;
        this._name = name;
        this.dateTimeOccurred = dateTimeOccurred;
    }

    public static create(id: SubjectID, name: string): SubjectCreatedEvent {
        return new SubjectCreatedEvent(id, name, new Date());
    }

    get id(): SubjectID { return this._id; }
    get name(): string { return this._name; }
    get description(): string { return this._description; }
}

