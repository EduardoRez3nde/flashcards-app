    import Identifier from "domain/identifier";
    import { validate, v4 as uuid } from "uuid";


    export default class CategoryID extends Identifier<string> {

        private constructor(id: string) {
            super(id);
        }

        public static unique(): CategoryID {
            return new CategoryID(uuid());
        }

        public static from(id: string): CategoryID {
            if (!validate(id))
                throw new Error("Invalid UUID format");
            return new CategoryID(id);
        }
    }