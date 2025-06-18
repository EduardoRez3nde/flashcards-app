const UpdateCategorySchema = {
    summary: 'Atualizar uma categoria',
    description: 'Atualiza parcialmente uma categoria existente (nome e/ou status) pelo seu ID.',
    tags: ["Categories"],

    body: {
        type: "object",
        minProperties: 1,
        properties: {
            name: { type: "string", minLength: 3, maxLength: 150 },
            isActive: { type: "boolean" }
        },
        required: ["name"]
    },

    params: {
        type: "object",
        properties: {
            id: { type: "string", format: "uuid" }
        },
        required: ["id"]
    },

    response: {
        "200": {
            description: "Categoria atualizada com sucesso.",
            type: "null"
        },
        
        "404": {
            description: "Categoria não encontrada.",
            type: "object",
            properties: { message: { type: "string" } }
        }
    },
};


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
};

export const SearchCategorySchema = {

    quertString: {
        type: "object",
        properties: {
            page: { type: "number", default: 1, minimum: 1 },
            perPage: { type: "number", default: 15, minimum: 1 },
            sort: { type: "string" },
            sortDir: { type: "string", enum: ["asc", "desc"] },
            name: { type: "string" },
            isActive: { type: "boolean" }
        }
    },

    response: {
        "200": {
            type: "object",
            properties: {
                items: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            name: { type: "string" },
                            isActive: { type: "boolean" },
                            createdAt: { type: "string", format: "date-time" }
                        }
                    }
                },
                total: { type: "integer" },
                currentPage: { type: "integer" },
                lastPage: { type: "integer" },
                perPage: { type: "integer" }
            }
        }
    }
};
