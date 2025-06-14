
export interface DomainEvent {
    readonly dateTimeOccurred: Date;
};

export interface DomainEventPublished {
    publishEvent(event: DomainEvent): void;
}