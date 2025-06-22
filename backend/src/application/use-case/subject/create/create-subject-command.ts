import CategoryID from "domain/entities/category/category-id";

export class CreateSubjectCommand {

    constructor(readonly name: string, readonly categoryID: CategoryID) { }

    public static create(name: string, categoryID: CategoryID): CreateSubjectCommand {
        return new CreateSubjectCommand(name, categoryID);
    }
}