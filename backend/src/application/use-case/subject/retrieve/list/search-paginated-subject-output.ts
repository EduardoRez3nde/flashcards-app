export type SubjectOutput = {
    id: string;
    name: string;
    categoryID: string;
    isActive: boolean;
    createdAt: Date;
};

export type SearchPaginatedSubjectOutput = {
    items: SubjectOutput[];
    total: number;
    currentPage: number;
    lastPage: number;
    perPage: number;
};