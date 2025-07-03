import { EventHandler, EventKey, EventTopic, EventType, IEventMessage } from "../../../services/eventHandler/EventHandler";

export default class CaptureHandler {
    //handler func to process data when produce or consume to a topic
    public async produceTreatmentRuler(topic: string, data: any, eventType?: string): Promise<IEventMessage[]> {
        switch(topic) {
            //produce action
            case EventTopic.CapturedToRuler: {
                return [
                    {
                        key: EventKey.CapturedToRulerSignUp,
                        value: JSON.stringify({
                            data: data,
                            eventType: EventType.SignUp
                        })
                    }
                ];
            }

            default: 
                return [
                    {
                        key: "",
                        value: JSON.stringify(data)
                    }
                ];
        }
    }

    public async consumeProcess() {}
}