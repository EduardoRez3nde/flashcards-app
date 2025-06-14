import CategoryID from "domain/entities/category/category-id";

export default class CreateCategoryCommand {

    private name: string;
    private isActive: boolean;

    private constructor(name: string, isActive: boolean) {
        this.name = name;
        this.isActive = isActive;
    }

    public static create(name: string, isActive: boolean): CreateCategoryCommand {
        return new CreateCategoryCommand(name, isActive);
    }
}