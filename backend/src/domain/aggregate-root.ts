import Entity from "./entity";
import { DomainEvent, DomainEventPublisher } from "./events/domain-event";
import Identifier from "./identifier";


export abstract class AggregateRoot<ID extends Identifier<any>> extends Entity<ID> {

    private readonly _events: DomainEvent[] = [];

    constructor(id: ID) {
        super(id);
    }

    get events(): readonly DomainEvent[] {
        return this._events;
    }

    public addEvent(event: DomainEvent): void {
        if (!event) return;
        this._events.push(event);
    }

    public clearEvent(): void {
        this._events.length = 0;
    }

    public publishedEvent(published: DomainEventPublisher): void {

        if (!published)
            return;

        this.events.forEach((event) => published.dispatch(event));

        this.clearEvent();
    }
}

