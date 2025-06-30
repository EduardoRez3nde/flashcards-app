export type CategoryOutput = {
    id: string;
    name: string;
    isActive: boolean;
    createdAt: Date;
};

export type SearchPaginatedCategoryOutput = {
    items: CategoryOutput[];
    total: number;
    currentPage: number;
    lastPage: number;
    perPage: number;
};