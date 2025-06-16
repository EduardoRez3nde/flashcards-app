import CreateCategoryCommand from "application/use-case/category/create/create-category-command";
import { CreateCategoryUseCase } from "application/use-case/category/create/create-category-use-case";
import { FastifyReply, FastifyRequest } from "fastify";


export interface CreateCategoryRequest {
    Body: {
        name: string,
        isActive: boolean
    };
};

export class CategoryController {

    constructor(
        private readonly createCategoryUseCase: CreateCategoryUseCase
    ) { }

    async create(request: FastifyRequest<CreateCategoryRequest>, reply: FastifyReply): Promise<FastifyReply> {

        const command: CreateCategoryCommand = {
             name: request.body.name, 
             isActive: request.body.isActive
        };

        const result = await this.createCategoryUseCase.execute(command);

        if (result.isLeft()) 
            return reply.status(422).send(result.value);

        return reply.status(201).send(result.value);
    }
}