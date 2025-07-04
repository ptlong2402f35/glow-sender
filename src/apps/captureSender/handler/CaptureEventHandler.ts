import { EachMessagePayload } from "kafkajs";
import { EventHandler, EventTopic } from "../../../services/eventHandler/EventHandler";
import KafkaService from "../../../services/kafka/KafkaService";
import CaptureHandler from "./CaptureHandler";
import Config from "../../../config/Config";
const ConsumeTopics = Config.module.consumeTopics;
export default class CaptureEventHandler extends EventHandler {
    protected kafkaService: KafkaService;
    protected captureHandler: CaptureHandler;
    constructor() {
        super();
        this.kafkaService = new KafkaService();
        this.captureHandler = new CaptureHandler();
    }
    //process consume action when register to a topic
    public async consumeHandler(data: EachMessagePayload) {
        try {
            let parseValue = this.decodeMessage(data);
            if(!parseValue) return;
            switch(data?.topic) {
                default: {
                    console.log(`Consumer ${data.topic}: ===`, {
                        key: data.message.key?.toString(),
                        value: JSON.parse(data.message.value?.toString() || "") || "",
                    });
                }
            }
        }
        catch (err) {
            console.error(err);
        }
    };
    //consume register
    public async consumeRegist() {
        await this.kafkaService.initRegistConsumer(ConsumeTopics, async (data: EachMessagePayload) => this.consumeHandler(data));
    }
    //produce action
    public async produce(topic: string, data: Record<string, string>, type?: string) {
        console.log("init process", topic);
        console.log("init process", data);
        let message = await this.captureHandler.produceTreatmentRuler(topic, data, type);
        console.log("Message to push", message);
        if(!message) return;
        await this.kafkaService.produceEvent(topic, message);
    }
}