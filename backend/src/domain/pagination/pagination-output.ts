
/**
 * Represents the structure of a paginated response.
 * 
 * @template Item - The type of the items being paginated.
 */
export interface PaginationOutput<Item = any> {

    /** The list of items on the current page. */
    items: Item[];

    /** The total number of items across all pages. */
    total: number;

    /** The current page number. */
    currentPage: number;

    /** The last page number based on total and perPage. */
    lastPage: number;

    /** The number of items per page. */
    perPage: number;
}


/**
 * Provides a utility to convert raw pagination data into a standardized `PaginationOutput` object.
 */
export class PaginationOutputMapper {

    /**
     * Maps raw pagination values to a `PaginationOutput` object.
     * 
     * @template Item - The type of items being paginated.
     * 
     * @param items - The list of items on the current page.
     * @param total - The total number of items across all pages.
     * @param page - The current page number.
     * @param perPage - The number of items per page.
     * 
     * @returns A properly structured `PaginationOutput` object.
     */
    public static toOutput<Item = any>(
        items: Item[],
        total: number,
        page: number,
        perPage: number
    ): PaginationOutput<Item> {
        const lastPage: number = Math.ceil(total / perPage);
        return {
            items,
            total,
            currentPage: page,
            lastPage: lastPage > 0 ? lastPage : 1,
            perPage,
        };
    }
}
