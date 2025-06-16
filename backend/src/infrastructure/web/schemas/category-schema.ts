import { format } from "path";
import { types } from "util";

// Esquema para o corpo da requisição de criação de uma categoria
export const CreateCategorySchema = {

    body: {
        type: "object",
        properties: {
            name: { type: "string", minLength: 5 },
            isActive: { type: "boolean" }
        },
        required: ["name"]
    },

    response: {
        "201": {
            type: "object",
            properties: {
                id: { type: "string" },
                name: { type: "string" },
                is_active: { type: "boolean" },
                created_at: { type: "string", format: "date-time" }
            }
        },
    },
    summary: "Create a new category",
    tags: ["Categories"]
};

export const DeleteCategorySchema = {

    params: {
        type: "object",
        properties: {
            id: { type: "string", format: "uuid" }
        },
        required: ["id"],
    },

    response: {
        "204": {
            type: "null",
            description: 'Category deleted successfully'
        },
         
        "404": {
            type: "object",
            properties: {
                message: { type: "string" }
            }
        }
    },
    summary: 'Deletes a category by its ID',
    tags: ["Categories"],
}
