import { group } from "console";
import { Kafka, Producer, Consumer, EachMessagePayload } from "kafkajs";

const KafkaClientId = process.env.KAFKA_CLIENT_ID || null;
const KafkaGroupId = process.env.KAFKA_GROUP_ID || null;

export default class KafkaManager {
    private static instance: Kafka;
    private producer: Producer;
    private consumer: Consumer;

    public getInstance() {
        if (!KafkaManager.instance) {
            this.init();
        }
        return KafkaManager.instance;
    }

    public init() {
        KafkaManager.instance = new Kafka({
            // clientId: process.env.KAFKA_CLIENT_ID,
            brokers: ["34.142.186.189:29092"],
        });
        this.producer = KafkaManager.instance.producer();

    }

    public produceMessage(topic: string, message: string) {
        if (!this.producer) {
            this.produceConnect();
        }
        return this.producer.send({
            topic: topic,
            messages: [
                { value: 'test!' },
            ],
        });
    }

    private async produceConnect() {
        try {
            if (!this.producer) {
                this.producer = KafkaManager.instance.producer();
            }
            await this.producer.connect();
        }
        catch (err) {
            console.error(err);
        }
    }

    private async produceDisconnect() {
        if (this.producer) {
            await this.producer.disconnect();
        }
    }

    public async consumerTopic(topic: string) {
        if (!this.consumer) {
            this.consumer = KafkaManager.instance.consumer({ groupId: KafkaGroupId || ""});
        }
        await this.consumer.connect();
        await this.consumer.subscribe({ topic: 'topic', fromBeginning: true });

        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
                console.log({
                value: message.value?.toString(),
                })
            },
        });
    }
}