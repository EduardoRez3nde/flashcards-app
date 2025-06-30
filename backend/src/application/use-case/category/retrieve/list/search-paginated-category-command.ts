import { CategoryFilter } from "domain/entities/category/category-repository";


export type SearchPaginatedCategoryCommand = {

    page?: number;
    perPage?: number;
    sort?: string |null;
    sortDir: "asc" | "desc" | null;
    filter: CategoryFilter;
}