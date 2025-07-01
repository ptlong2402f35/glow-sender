import { IEventHandler } from "../eventHandler/EventHandler";
import KafkaManager from "./KafkaManager";

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

    public async consumerRegist(topic: string, handler: IEventHandler) {
        await this.kafkaManager.consumerTopic(topic, handler);
    }

    public async produceEvent(topic: string, data: any) {
        await this.kafkaManager.produceMessage(topic, data);
    }
}