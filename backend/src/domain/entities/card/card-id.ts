import Identifier from "domain/identifier";
import { v4 as uuid } from "uuid";
import { validate } from "uuid";

export default class CardID extends Identifier<string> {

    constructor(private readonly id: string) {
        super(id);
    }

    public static unique(): CardID {
        return new CardID(uuid());
    }

    public static from(id: string): CardID {
        if (!validate(id)) {
            throw new Error(`Invalid UUID format: ${id}`)
        }
        return new CardID(id);
    }
}