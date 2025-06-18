export default class CreateCategoryCommand {

    private constructor(readonly name: string, readonly isActive: boolean) { }

    public static create(name: string, isActive: boolean): CreateCategoryCommand {
        return new CreateCategoryCommand(name, isActive);
    }
}