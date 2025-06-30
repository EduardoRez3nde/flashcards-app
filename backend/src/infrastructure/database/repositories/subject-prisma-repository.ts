import { PrismaClient } from "@prisma/client";
import CategoryID from "domain/entities/category/category-id";
import { Subject } from "domain/entities/subject/subject";
import SubjectID from "domain/entities/subject/subject-id";
import { SubjectFilter, SubjectRepository } from "domain/entities/subject/subject-repository";
import { PaginationOutput } from "domain/pagination/pagination-output";
import { SearchInput } from "domain/pagination/search-input";


export class SubjectPrismaRepository implements SubjectRepository {

    constructor(private readonly prisma: PrismaClient) {}

    async create(subject: Subject): Promise<Subject> {

        const data = {
            id: subject.id.value,
            name: subject.name,
            isActive: subject.isActive,
            createdAt: subject.createdAt,
            category: {
                connect: { id: subject.categoryID.value }
            },
        };

        const result = await this.prisma.subject.create({ data });
        
        return Subject.with(
            SubjectID.from(result.id),
            {
                name: result.name,
                isActive: result.isActive,
                createdAt: result.createdAt,
                categoryID: CategoryID.from(result.categoryId)
            }
        );

    }
    
    deleteById(id: SubjectID): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(subject: Subject): Promise<Subject> {
        throw new Error("Method not implemented.");
    }
    findById(id: SubjectID): Promise<Subject | null> {
        throw new Error("Method not implemented.");
    }
    search(searchInput: SearchInput<SubjectFilter>): Promise<PaginationOutput<Subject>> {
        throw new Error("Method not implemented.");
    }

    
}