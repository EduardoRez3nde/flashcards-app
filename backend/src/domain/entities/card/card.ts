import { AggregateRoot } from "domain/aggregate-root";
import CardID from "./card-id";
import ValidationHandler from "domain/validation/validation-handler";


export interface CardProps {
    name: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
};

export default class Card extends AggregateRoot<CardID> {

    private _id: CardID;
    private _name: string;
    private _description: string;
    private _isActive: boolean;
    private _createdAt: Date;

    private constructor(
        id: CardID,
        props: CardProps
    ) {
        super(id);
    }

    public static create(name: string, description: string, isActive: boolean): Card {
        return new Card(CardID.unique(), name, description, isActive);
    }

    public static from(id: CardID, name: string, description: string, isActive: boolean): Card {
        return new Card(id, name, description, isActive);
    }

    validate(handler: ValidationHandler): void {
        throw new Error("Method not implemented.");
    } 
}
