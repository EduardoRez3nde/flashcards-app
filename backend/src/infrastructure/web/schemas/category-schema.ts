
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
                name: { name: "string" }
            }
        },
    },
    summary: "Create a new category",
    tags: ["Categories"]
};

