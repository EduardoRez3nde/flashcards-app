import { SearchInput } from "domain/pagination/search-input";
import { Category } from "./category";
import CategoryID from "./category-id";
import { PaginationOutput } from "domain/pagination/pagination-output";

/**
 * Available filters for searching categories.
 */
export interface CategoryFilter {
    /**
     * The name of the category (optional). Used for name-based searches.
     */
    name?: string;

    /**
     * The active status of the category (optional).
     * true for active, false for inactive.
     */
    isActive?: boolean;
}

/**
 * Interface that defines the contract for a category repository.
 * A repository is responsible for persisting, retrieving, updating, and removing
 * domain entities, in this case, `Category` instances.
 */
export interface CategoryRepository {

    /**
     * Persists a new category in the repository.
     * @param {Category} category - The category instance to be created.
     * @returns {Promise<Category>} A Promise that resolves with the created category.
     */
    create(category: Category): Promise<Category>;

    /**
     * Removes a category from the repository by its ID.
     * @param {CategoryID} id - The identifier of the category to be removed.
     * @returns {Promise<void>} A Promise that resolves when the removal is complete.
     */
    deleteById(id: CategoryID): Promise<void>;

    /**
     * Updates an existing category.
     * @param {Category} category - The category with the updated data.
     * @returns {Promise<Category>} A Promise that resolves with the updated category.
     */
    update(category: Category): Promise<Category>;

    /**
     * Finds a category by its ID.
     * @param {CategoryID} id - The identifier of the category.
     * @returns {Promise<Category | null>} A Promise that resolves with the category, or `null` if not found.
     */
    findById(id: CategoryID): Promise<Category | null>;

    /**
     * Performs a paginated search for categories based on filter and pagination criteria.
     * @param {SearchInput<CategoryFilter>} searchInput - The search and pagination parameters.
     * @returns {Promise<PaginationOutput<Category>>} A Promise that resolves with the paginated search results.
     */
    search(searchInput: SearchInput<CategoryFilter>): Promise<PaginationOutput<Category>>;
}
