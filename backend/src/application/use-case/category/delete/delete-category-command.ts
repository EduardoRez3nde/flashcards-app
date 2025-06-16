export class DeleteCategoryCommand {

    constructor(public readonly id: string) { }

    public static create(id: string): DeleteCategoryCommand {
        return new DeleteCategoryCommand(id);
    }
}

