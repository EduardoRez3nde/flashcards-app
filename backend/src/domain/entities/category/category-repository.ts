import { SearchInput } from "domain/pagination/search-input";
import { Category } from "./category";
import CategoryID from "./category-id";
import { PaginationOutput } from "domain/pagination/pagination-output";


interface CategoryFilter {
    name?: string;
    isActive?: boolean;
}

export interface CategoryRepository {

    create(category: Category): Promise<Category>;

    deleteById(id: CategoryID): Promise<void>;

    update(category: Category): Promise<Category>;

    findById(id: CategoryID): Promise<Category | null>;

    finAllPaginated(): Promise<Category[]>;

    search(searchInput: SearchInput<CategoryFilter>): Promise<PaginationOutput<Category>>;
}
