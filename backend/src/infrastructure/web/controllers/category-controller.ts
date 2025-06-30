import CreateCategoryCommand from "application/use-case/category/create/create-category-command";
import { CreateCategoryUseCase } from "application/use-case/category/create/create-category-use-case";
import { DeleteCategoryCommand } from "application/use-case/category/delete/delete-category-command";
import { DeleteCategoryUseCase } from "application/use-case/category/delete/delete-category-use-case";
import { SearchPaginatedCategoryCommand } from "application/use-case/category/retrieve/list/search-paginated-category-command";
import { SearchPaginatedCategoryUseCase } from "application/use-case/category/retrieve/list/search-paginated-category-use-case";
import { UpdateCategoryCommand } from "application/use-case/category/update/update-category-command";
import { UpdateCategoryUseCase } from "application/use-case/category/update/update-category-use-case";
import { CategoryFilter } from "domain/entities/category/category-repository";
import { NotFoundError } from "domain/validation/errors/not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";


export interface CategoryRequest {
    Body: {
        name: string,
        isActive: boolean
    };

    Params: {
        id: string
    };
    
    Querystring: {
        page?: number | 1;
        perPage?: number | 10;
        sort?: string | "createdAt";
        sortDir?: "asc" | "desc";
        filter?: CategoryFilter;
    };
}

export class CategoryController {

    constructor(
        private readonly createCategoryUseCase: CreateCategoryUseCase,
        private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
        private readonly searchPaginatedCategoryUseCas: SearchPaginatedCategoryUseCase,
        private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    ) { }

    async create(request: FastifyRequest<CategoryRequest>, reply: FastifyReply): Promise<FastifyReply> {

        const command: CreateCategoryCommand = {
             name: request.body.name, 
             isActive: request.body.isActive
        };

        const result = await this.createCategoryUseCase.execute(command);

        if (result.isLeft()) 
            return reply.status(422).send(result.value);

        return reply.status(201).send(result.value);
    }

    async deleteById(request: FastifyRequest<CategoryRequest>, reply: FastifyReply): Promise<void> {

        const command: DeleteCategoryCommand = {
            id: request.params.id
        };

        const result = await this.deleteCategoryUseCase.execute(command);

        if (result.isLeft()) {

            const error = result.value;

            if (error instanceof NotFoundError) {
                return reply.status(404).send({ message: error.message });
            }
        }
        return reply.status(204).send();
    }

    async findAll(request: FastifyRequest<CategoryRequest>, reply: FastifyReply): Promise<FastifyReply> {

        const { 
            page = 1,
            perPage = 10,
            sort = "createdAt",
            sortDir = "asc",
            filter = {}
        } = request.query as CategoryRequest["Querystring"];

        const command: SearchPaginatedCategoryCommand = {
            page: Number(page),
            perPage: Number(perPage),
            sort: sort,
            sortDir: sortDir,
            filter: {
                name: filter.name,
                isActive: filter.isActive
            } 
        };

        const result =  await this.searchPaginatedCategoryUseCas.execute(command);

        if (result.isRight()) {
            return reply.status(200).send(result.value);
        } else {
            return reply.status(500).send({ error: "Internal Server Error", message: result.value.getErrors() });
        }
    }

    async update(request: FastifyRequest<CategoryRequest>, reply: FastifyReply): Promise<FastifyReply> {

        const command: UpdateCategoryCommand = {
            id: request.params.id,
            name: request.body.name,
            isActive: request.body.isActive
        };

        const result = await this.updateCategoryUseCase.execute(command);

        if (result.isRight()) {
            return reply.status(200).send(result.value);
        } 
        else {
            const firstError = result.value.getErrors()[0];
            
            if (firstError instanceof NotFoundError) {
                return reply.status(404).send({ message: firstError.message });
            }
            else {
                return reply.status(422).send(result.value);
            }
        }
    }
}
