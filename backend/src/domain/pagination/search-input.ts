/**
 * Represents the input parameters for searching or querying a paginated list.
 * 
 * @template Filter - The type of the filter criteria applied to the search.
 */
export interface SearchInput<Filter = string> {

    /** The page number to retrieve (optional). */
    page?: number;

    /** The number of items per page (optional). */
    perPage?: number;

    /** The field name to sort by (optional, can be null). */
    sort?: string | null;

    /** The direction of sorting: ascending ('asc'), descending ('desc'), or null. */
    sortDir: 'asc' | 'desc' | null;

    /** The filter criteria to apply to the search. */
    filter: Filter;
}
