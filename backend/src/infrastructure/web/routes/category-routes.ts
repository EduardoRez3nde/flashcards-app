import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateCategorySchema, DeleteCategorySchema, SearchCategorySchema, UpdateCategorySchema } from "../schemas/category-schema";
import { categoryController } from "../dependencies/category-dependencies";
import { CategoryRequest } from "../controllers/category-controller";


export const categoryRoutes = (fastify: FastifyInstance) => {

    fastify.post("/", {
        schema: CreateCategorySchema,
        handler: (request: FastifyRequest<CategoryRequest>, reply: FastifyReply) => categoryController.create(request, reply)
    });

    fastify.delete("/:id", {
        schema: DeleteCategorySchema,
        handler: (request: FastifyRequest<CategoryRequest>, reply: FastifyReply) => categoryController.deleteById(request, reply)
    });
    
    fastify.get("/", {
        schema: SearchCategorySchema,
        handler: (request: FastifyRequest<CategoryRequest>, reply: FastifyReply) => categoryController.findAll(request, reply)
    });

    fastify.patch("/:id", {
        schema: UpdateCategorySchema,
        handler: (request: FastifyRequest<CategoryRequest>, reply: FastifyReply) => categoryController.update(request, reply)
    });
}  