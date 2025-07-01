export interface IEventHandler {
    handle(data: any): Promise<void>,
    consumeHandler(): Promise<void>,
    consumeRegist(): Promise<void>,
}

export interface IEventMessage {
    key: string;
    value: string;
}

export abstract class EventHandler implements IEventHandler{
    abstract handle(data: any): Promise<void>;
    abstract consumeHandler(): Promise<void>;
    abstract consumeRegist(): Promise<void>;
}