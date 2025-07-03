import KafkaManager from "./KafkaManager";
import Config from "../../config/Config";
import { EachMessagePayload } from "kafkajs";
import { IEventMessage } from "../eventHandler/EventHandler";

export default class KafkaService {
    kafkaManager: KafkaManager;
    constructor() {
        this.kafkaManager = new KafkaManager().getInstance();
    }

    public async getKafkaTopic() {
        const kafkaIns = await this.kafkaManager.getKafkaInstance();
        const admin = kafkaIns.admin();
        await admin.connect();
        const topics = await admin.listTopics();
        console.log("topics in kafka exist are: ===", topics);
        await admin.disconnect();
    }

    public async initRegistConsumer(topics: string[], handler: (data: EachMessagePayload) => Promise<void>) {
        await this.kafkaManager.consumerTopic(topics, handler);
    }

    public async produceEvent(topic: string, data: IEventMessage[]) {
        await this.kafkaManager.produceMessage(topic, data);
    }

    
}