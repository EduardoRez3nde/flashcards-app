
export interface PaginationOutput<Item = any> {

    items: Item[];
    total: number;
    currentPage: number;
    lastPage: number;
    perPage: number;
};

export class PaginationOutputMapper {

    public static toOutput<Item = any>(
        items: Item[],
        total: number,
        page: number,
        perPage: number
    ): PaginationOutput<Item> {
        const lastPage: number = Math.ceil(total/perPage);
        return {
            items,
            total,
            currentPage: page,
            lastPage: lastPage > 0 ? perPage : 1,
            perPage,
        }
    }
}