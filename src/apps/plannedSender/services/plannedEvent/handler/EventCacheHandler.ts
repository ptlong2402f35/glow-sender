export interface ICacheEventHandler {
    onSaveEvent(data: any): Promise<void>,
    onProcessEvent(): Promise<void>,
}

export abstract class EventCacheHandler implements ICacheEventHandler{
    abstract onSaveEvent(data: any): Promise<void>;
    abstract onProcessEvent(): Promise<void>
}