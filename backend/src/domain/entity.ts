import Identifier from "./identifier";


export default abstract class Entity<ID extends Identifier<ID>> {

    private readonly _id: ID;

    constructor(id: ID) {
        if (!id) throw new Error("'id' should not be null");
        this._id = id;
    }

    abstract validate(): void;

    get id(): ID {
        return this._id;
    }

    public equals(other?: Entity<ID>): boolean {
        if (other === null || other === undefined) {
            return false;
        }
        if (!(other instanceof Entity)) {
            return false;
        }
        return this._id.value.equals(other._id.value);
    }
}

