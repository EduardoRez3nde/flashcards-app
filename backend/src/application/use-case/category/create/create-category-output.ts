import { Category } from "domain/entities/category/category";


export default class CreateCategoryOutput {

    private id: string;

    private constructor(id: string) {
        this.id = id;
    } 

    public static from(id: string): CreateCategoryOutput {
        return new CreateCategoryOutput(id);
    }

    public static of(category: Category): CreateCategoryOutput {
        return CreateCategoryOutput.from(category.id.value);
    }
}