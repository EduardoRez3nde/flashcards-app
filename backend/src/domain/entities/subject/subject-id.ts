import Identifier from "domain/identifier";
import { v4 as uuid } from "uuid";
import { validate } from "uuid";


export default class SubjectID extends Identifier<string> {

    private constructor(id: string) {
        super(id);
    }

    public static unique() {
        return new SubjectID(uuid());
    }

    public static from(id: string) {
        if (!validate(id)) {
            throw new Error(`Invalid UUID format: ${id}`)
        }
        return new SubjectID(id);
    }
}