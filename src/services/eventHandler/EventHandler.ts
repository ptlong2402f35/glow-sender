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

export const EventTypes = [
    "sign_up",
    
]

export type EventTypeListType = typeof EventTypes[number];

export enum EventType {
    SignUp = "sign_up",
    SignUpNotiAction = "sign_up_noti",
}

export const EventTopicLists = [
    "treatment-event-send",
]

export enum EventTopic {
    CapturedToRuler = "treatment-event-send",
    RulerToPlanned = "treatment-plan",
    PlannedToRuler = "plan-treatment",
    RulerToTriggerFunction = "treatment-trigger-function"
}

export type EventTopicListType = typeof EventTopicLists[number];

export enum EventKey {
    CapturedToRulerSignUp = "treatment-event-send-signup",
    RulerToPlannedSignUp = "treatment-plan-signup",
    PlannedToRulerSignUp = "plan-treatment-signup",
    RulerToTriggerFunctionSignUp = "treatment-trigger-function-signup"
}

export abstract class EventHandler implements IEventHandler{
    abstract consumeHandler(data: EachMessagePayload): Promise<void>;
    abstract consumeRegist(): Promise<void>;
    abstract produce(topic: string, data: any): Promise<void>;

    protected decodeMessage(data: EachMessagePayload) {
        try {
            let value = JSON.parse(data.message.value?.toString() || "") || "";

            return {
                key: data.message?.key?.toString() || "",
                value
            }
        }
        catch (err: any) {
            console.error(err);
            return null;
        }
    }

    protected encodeMessage(data: Record<any, any>) {
        try {
            let value = JSON.stringify(data.value) || "";

            return {
                key: data.key,
                value
            }
        }
        catch (err: any) {
            console.error(err);
            return null;
        }
    }
}