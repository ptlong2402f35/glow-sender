import { EachMessagePayload } from "kafkajs";
import { EventHandler, EventTopic } from "../../../services/eventHandler/EventHandler";
import KafkaService from "../../../services/kafka/KafkaService";
import PlannedHandler from "./PlannedHandler";
import Config from "../../../config/Config";
const ConsumeTopics = Config.module.consumeTopics;

export default class PlannedEventHandler extends EventHandler {
    protected kafkaService: KafkaService;
    protected plannedHandler: PlannedHandler;
    constructor() {
        super();
        this.kafkaService = new KafkaService();
        this.plannedHandler = new PlannedHandler();
    }
    //process consume action when register to a topic
    public async consumeHandler(data: EachMessagePayload) {
        try {
            let parseValue = this.decodeMessage(data);
            if(!parseValue) return;
            await this.plannedHandler.consumeProcess(data, parseValue);
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
        let message = await this.plannedHandler.produceProcess(topic, data, type);
        console.log(` ==== [Message push] to topic: ${topic}`, message);
        if(!message) return;
        await this.kafkaService.produceEvent(topic, message);
    }
}