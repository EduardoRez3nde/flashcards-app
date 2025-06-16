import CreateCategoryCommand from "application/use-case/category/create/create-category-command";
import { CreateCategoryUseCase } from "application/use-case/category/create/create-category-use-case";
import { DeleteCategoryCommand } from "application/use-case/category/delete/delete-category-command";
import { DeleteCategoryUseCase } from "application/use-case/category/delete/delete-category-use-case";
import { NotFoundError } from "domain/validation/errors/not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";


export interface CategoryRequest {
    Body: {
        name: string,
        isActive: boolean
    };

    Params: {
        id: string
    }
};

export class CategoryController {

    constructor(
        private readonly createCategoryUseCase: CreateCategoryUseCase,
        private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
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
}
