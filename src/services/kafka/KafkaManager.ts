import { Kafka, Producer, Consumer, EachMessagePayload } from "kafkajs";

import Config from "../../config/Config";
import { IEventHandler, IEventMessage } from "../eventHandler/EventHandler";

export default class KafkaManager {
    private static instance: KafkaManager;
    private kafka: Kafka;
    private producer: Producer;
    private consumer: Consumer;

    public getInstance() {
        if (!KafkaManager.instance) {
            KafkaManager.instance = new KafkaManager();
        }
        return KafkaManager.instance;
    }

    public async init() {
        this.kafka = new Kafka({
            clientId: Config.kafka.clientId,
            brokers: Config.kafka.brokers,
        });
        await this.initKafkaComponent();
    }

    private async initKafkaComponent() {
        try {
            if (!this.producer)
                this.producer = this.kafka.producer();
            
            if(!this.consumer) 
                this.consumer = this.kafka.consumer({ groupId: Config.kafka.groupId || ""});
        }
        catch (err) {
            console.error(err);
        }
    }

    public async getKafkaInstance() {
        return this.kafka;
    }

    public async produceMessage(topic: string, data: IEventMessage[]) {
        if (!this.producer) {
            await this.initKafkaComponent();
        }
        await this.producer.connect();
        await this.producer.send({
            topic: topic,
            messages: data,
        });
        await this.producer.disconnect();
    }

    public async consumerTopic(topic: string, handler: IEventHandler) {
        if (!this.consumer) {
            await this.initKafkaComponent();
        }
        await this.consumer.connect();
        await this.consumer.subscribe({ topic: topic, fromBeginning: true });

        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
                handler.handle({topic, partition, message});
            },
        });
    }

    public async disconnect() {
        console.log("Disconnect kafka.....");
        await this.consumer.disconnect();
    }
}