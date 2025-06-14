import { Category } from "./category";
import CategoryID from "./category-id";

export interface CategoryRepository {

    create(category: Category): Promise<Category>;

    deleteById(id: CategoryID): Promise<void>;

    update(category: Category): Promise<Category>;

    findById(id: CategoryID): Promise<Category | null>;


}