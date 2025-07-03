import { EachMessagePayload } from "kafkajs";
import { EventHandler, EventKey, EventTopic, EventType, IEventMessage } from "../../../services/eventHandler/EventHandler";

export default class PlannedHandler {
    //handler func to process data when produce or consume to a topic
    public async produceProcess(topic: string, data: any, type?: string): Promise<IEventMessage[]> {
        switch(topic) {
            //produce action
            case EventTopic.PlannedToRuler: {
                switch (type) {
                    case EventType.SignUpNotiAction: {
                        //build message to send
                        return [
                            {
                                key: EventKey.PlannedToRulerSignUp,
                                value: JSON.stringify({
                                    data: data,
                                    eventType: EventType.SignUpNotiAction
                                }),
                            }
                        ];
                    }

                    default: 
                        return [
                            {
                                key: "",
                                value: JSON.stringify(data)
                            }
                        ]
                }

                break;
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

    public async consumeProcess(data: EachMessagePayload, message: IEventMessage) {
        try {
            if(!message || !data) console.log(" ==== [PlannedModule] [ConsumerProcess] ==== message invalid");
            let value = JSON.parse(message?.value || "");
            switch(data?.topic) {
                case EventTopic.RulerToPlanned: {
                    switch(value?.eventType) {
                        case EventType.SignUp: {
                            // schedule for event
                            break;
                        }

                        default: {
                            console.log(` ==== [PlannedModule] [ConsumerProcess] ==== Not found topic ${data.topic} and eventType with type: ${value?.eventType}`)
                        }
                    }

                    break;
                }
                default: {
                    console.log(` ==== [PlannedModule] [ConsumerProcess] ==== Not found topic ${data.topic}`);
                    console.log(`Consumer ${data.topic}: ===`, {
                        key: data.message.key?.toString(),
                        value: JSON.parse(data.message?.value?.toString() || "") || "",
                    });
                }
            }
        }
        catch (err) {
            console.error(err);
        }
    }
}