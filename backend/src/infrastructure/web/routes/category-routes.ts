import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateCategorySchema } from "../schemas/category-schema";
import { categoryController } from "../dependencies/category-dependencies";
import { CreateCategoryRequest } from "../controllers/category-controller";


export const categoryRoutes = (fastify: FastifyInstance) => {

    fastify.post("/", {
        schema: CreateCategorySchema,
        handler: (request: FastifyRequest<CreateCategoryRequest>, reply: FastifyReply) => categoryController.create(request, reply)
    });
    
}  