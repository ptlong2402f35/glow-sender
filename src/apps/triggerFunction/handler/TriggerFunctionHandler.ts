import { EachMessagePayload } from "kafkajs";
import { EventHandler, EventKey, EventTopic, EventType, IEventMessage } from "../../../services/eventHandler/EventHandler";
import CommunicationService from "../services/communication/CommunicationService";

export default class TriggerFunctionHandler {
    communicationService: CommunicationService;
    constructor() {
        this.communicationService = new CommunicationService();
    }
    //handler func to process data when produce or consume to a topic
    public async produceProcess(topic: string, data: any, type?: string): Promise<IEventMessage[]> {
        switch(topic) {
            //produce action

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
            if(!message || !data) console.log(" ==== [TriggerFunctionModule] [ConsumerProcess] ==== message invalid");
            let value = JSON.parse(message?.value || "");
            switch(data?.topic) {
                case EventTopic.RulerToTriggerFunction: {
                    switch(value?.eventType) {
                        case EventType.SignUpNotiAction: {
                            // push notification
                            await this.communicationService.pushSingleNoti(value.data.userId, "Chào mừng đến với Glow", "Thông báo Chào mừng");
                            break;
                        }

                        default: {
                            console.log(` ==== [TriggerFunctionModule] [ConsumerProcess] ==== Not found topic ${data.topic} and eventType with type: ${value?.eventType}`)
                        }
                    }

                    break;
                }
                default: {
                    console.log(` ==== [TriggerFunctionModule] [ConsumerProcess] ==== Not found topic ${data.topic}`);
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