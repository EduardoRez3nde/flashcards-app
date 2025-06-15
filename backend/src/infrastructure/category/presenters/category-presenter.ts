import { CategoryListResponse } from "../models/category-list-response";
import { CategoryResponse } from "../models/category-response";

export class CategoryPresenter {

    public static toResponse(output: CategoryResponse): CategoryResponse {

        return {
            id: output.id,
            name: output.name,
        }
    }

    public static toListResponse(output: CategoryListResponse): CategoryListResponse {

        return {
            id: output.id,
            name: output.name,
            isActive: output.isActive,
            createdAt: output.createdAt
        }
    }
}