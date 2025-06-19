import { AggregateRoot } from "domain/aggregate-root";
import ValidationHandler from "domain/validation/validation-handler";
import CardID from "./card-id";
import { CardCreatedEvent } from "domain/events/card/card-created-event";
import { CardValidation } from "./card-validation";


export interface CardProps {
    name: string;
    description: string;
    isActive?: boolean;
    createdAt?: Date;
};

export class Card extends AggregateRoot<CardID> {

    private _name: string;
    private _description: string;
    private _isActive: boolean;
    private _createdAt: Date;

    private constructor(id: CardID, props: CardProps) {
        super(id);
        this._name = props.name;
        this._description = props.description;
        this._isActive = props.isActive ?? true;
        this._createdAt = props.createdAt ?? new Date();
    }

    public static create(name: string, description: string): Card {
        
        const id: CardID = CardID.unique();
        
        const props: CardProps = {
            name: name,
            description: description
        };

        const card: Card = new Card(id, props);
        card.addEvent(CardCreatedEvent.create(id, name, description));
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
}

