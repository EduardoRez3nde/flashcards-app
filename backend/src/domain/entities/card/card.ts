import { AggregateRoot } from "domain/aggregate-root";
import ValidationHandler from "domain/validation/validation-handler";
import CardID from "./card-id";
import { CardCreatedEvent } from "domain/events/card/card-created-event";
import { CardValidation } from "./card-validation";
import SubjectID from "../subject/subject-id";


export interface CardProps {
    name: string;
    description: string;
    language?: string | null;
    codeContent?: string | null;
    subjectID: SubjectID;
    isActive?: boolean;
    isReviewed?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Card extends AggregateRoot<CardID> {

    private _name: string;
    private _description: string;
    private _language: string | null;
    private _codeContent: string | null;
    private _subjectID: SubjectID;
    private _isActive: boolean;
    private _createdAt: Date;

    private constructor(id: CardID, props: CardProps) {
        super(id);
        this._name = props.name;
        this._description = props.description;
        this._language = props.language ?? null;
        this._codeContent = props.codeContent ?? null;
        this._subjectID = props.subjectID;
        this._isActive = props.isActive ?? true;
        this._createdAt = props.createdAt ?? new Date();
    }

    public static create(input: { 
        name: string, 
        description: string, 
        language?: string, 
        codeContent?: string, 
        subjectID: SubjectID 
    }): Card {
        
        const id: CardID = CardID.unique();

        const card: Card = new Card(id, input);
        card.addEvent(CardCreatedEvent.create(card.id, card.name, card.description));
        return card;
    }

    public static with(id: CardID, props: CardProps): Card {
        return new Card(id, props);
    }

    validate(handler: ValidationHandler): void {
        new CardValidation(this, handler).validate();
    } 

    public activate(): void {
        this._isActive = true;
    }

    public deactivate(): void {
        this._isActive = false;
    }

    get name(): string { return this._name; }
    get description(): string { return this._description; }
    get isActive(): boolean { return this._isActive; }
    get createdAt(): Date { return this._createdAt; }
    get language(): string { return this._language; }
    get codeContent(): string { return this._codeContent; }
    get subjectID(): SubjectID { return this._subjectID; }
}

