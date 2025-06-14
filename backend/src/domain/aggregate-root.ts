import Entity from "./entity";
import { DomainEvent, DomainEventPublished } from "./events/domain-event";
import Identifier from "./identifier";


export abstract class AggregateRoot<ID extends Identifier<any>> extends Entity<ID> {

    private readonly _events: DomainEvent[] = [];

    constructor(id: ID) {
        super(id);
    }

    get events(): readonly DomainEvent[] {
        return this._events;
    }

    protected addEvent(event: DomainEvent): void {
        if (!event) return;
        this._events.push(event);
    }

    protected clearEvent(): void {
        this._events.length = 0;
    }

    protected publishedEvent(published: DomainEventPublished): void {

        if (!published)
            return;

        this.events.forEach((event) => published.publishEvent(event));

        this.clearEvent();
    }
}

