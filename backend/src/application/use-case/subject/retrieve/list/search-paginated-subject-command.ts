import { SubjectFilter } from "domain/entities/subject/subject-repository";


export type SearchPaginatedSubjectCommand = {

    page?: number;
    perPage?: number;
    sort?: string |null;
    sortDir: "asc" | "desc" | null;
    filter: SubjectFilter;
}