import { EachMessagePayload } from "kafkajs";
import { EventHandler } from "../../../services/eventHandler/EventHandler";
import KafkaService from "../../../services/kafka/KafkaService";
import CaptureHandler from "./CaptureHandler";


export default class CaptureEventHandler extends EventHandler {
    protected kafkaService: KafkaService;
    protected captureHandler: CaptureHandler;
    constructor() {
        super();
        this.kafkaService = new KafkaService();
        this.captureHandler = new CaptureHandler();
    }

    public async consumeHandler(data: EachMessagePayload) {
        switch(data?.topic) {
            default: {
                console.log(`Consumer ${data.topic}: ===`, data);
            }
        }
    };

    public async consumeRegist() {
        await this.kafkaService.initRegistConsumer(this.consumeHandler);
    }

    public async produce(topic: string, data: any) {
        let message = await this.captureHandler.produceTreatmentRuler(topic, data);
        await this.kafkaService.produceEvent(topic, message);
    }
}