import { SearchInput } from "domain/pagination/search-input";
import { Subject } from "./subject";
import SubjectID from "./subject-id";
import { PaginationOutput } from "domain/pagination/pagination-output";


export interface SubjectFilter {
    name?: string;
    isActive?: boolean;
    createdAt?: Date;
};

export interface SubjectRepository {

    create(subject: Subject): Promise<Subject>;

    deleteById(id: SubjectID): Promise<void>;

    update(subject: Subject): Promise<Subject>;

    findById(id: SubjectID): Promise<Subject | null>;

    search(searchInput: SearchInput<SubjectFilter>): Promise<PaginationOutput<Subject>>;

}

