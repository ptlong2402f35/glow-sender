import { EachMessagePayload } from "kafkajs";
export interface IEventHandler {
    consumeHandler(data: EachMessagePayload): Promise<void>,
    consumeRegist(): Promise<void>,
    produce(topic: string, data: any): Promise<void>,
}

export interface IEventMessage {
    key: string;
    value: string;
}

export abstract class EventHandler implements IEventHandler{
    abstract consumeHandler(data: EachMessagePayload): Promise<void>;
    abstract consumeRegist(): Promise<void>;
    abstract produce(topic: string, data: any): Promise<void>;
}