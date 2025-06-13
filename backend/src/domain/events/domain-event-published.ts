import { DomainEvent } from "./domain-event";


export interface IDomainEventPublisher {
    publishEvent(event: DomainEvent): void;
}