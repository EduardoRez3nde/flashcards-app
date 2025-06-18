/**
 * Representa o comando para atualizar uma categoria.
 * Contém o ID da categoria a ser atualizada e os novos valores opcionais.
 */
export class UpdateCategoryCommand {
    
    public readonly id: string;
    public readonly name: string | undefined;
    public readonly isActive: boolean | undefined;

    constructor(input: {
        id: string;
        name?: string;
        isActive?: boolean;
    }) {
        this.id = input.id;
        this.name = input.name;
        this.isActive = input.isActive;
    }
}