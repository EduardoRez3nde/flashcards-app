import { SearchInput } from "domain/pagination/search-input";
import { Card } from "./card";
import { PaginationOutput } from "domain/pagination/pagination-output";
import CardID from "./card-id";

export interface CardFilter {
    name?: string;
    isActive?: boolean;
}

export interface CardRepository {

    create(card: Card): Promise<Card>;

    deleteById(id: CardID): Promise<void>;

    update(card: Card): Promise<Card>;

    findById(id: CardID): Promise<Card | null>;

    search(searchInput: SearchInput<CardFilter>): Promise<PaginationOutput<Card>>;
}

