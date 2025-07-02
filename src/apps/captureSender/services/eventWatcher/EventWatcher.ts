export interface IEventWatcher {
    init(): Promise<void>;
    stop(): Promise<void>;
    handle(payload: string): Promise<void>;
    decode(payload: string, handlePayload: (payload: string) => Record<any, any>): Record<any, any> | null;
}


export default abstract class EventWatcher implements IEventWatcher {
    abstract init(): Promise<void>;
    abstract stop(): Promise<void>;
    abstract handle(payload: string): Promise<void>;

    decode(payload: string, handlePayload: (payload: string) => Record<any, any>): Record<any, any> | null {
        if(!payload) return null;
        let ret : Record<any, any> = handlePayload(payload);        

        return ret;
    }
}