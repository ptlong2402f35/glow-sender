import { EventTopic } from "../../../../services/eventHandler/EventHandler";
import CaptureEventHandler from "../../handler/CaptureEventHandler";
import EventWatcher from "./EventWatcher";
import PGWatcher from "./PGWatcher";
const UserRegisterKafkaTopic = process.env.USER_REGISTER_KAFKA_TOPIC || "sign_up";
const UserRegisterEventChannel = process.env.USER_REGISTER_EVENT_CHANNEL || "user-event-regist"; 

export default class UserEventWatcher extends EventWatcher{
    static instance: UserEventWatcher;
    pgWatcher: PGWatcher;
    startState: boolean;
    captureEventHandler: CaptureEventHandler;

    constructor() {
        super();
        this.pgWatcher = new PGWatcher().getInstance();
        this.captureEventHandler = new CaptureEventHandler();
    }

    getInstance() {
        if(!UserEventWatcher.instance) {
            UserEventWatcher.instance = new UserEventWatcher();
        }
        return UserEventWatcher.instance;
    }

    async init() {
        await this.pgWatcher.register(UserRegisterEventChannel, async (payload: string) => await this.handle(payload));
        this.startState = true;
        console.log("=== register done init ===", this.startState)
    }

    async stop(): Promise<void> {
        this.startState = false;
        console.log("[==== UserEventWatcher] stopped!!");
    }

    async handle(payload: string): Promise<void> {
        console.log("start state ***===", this.startState);
        if(!this.startState) return;

        console.log(`==== [UserEventWatcher][handle] payload: `, payload);

        let strParts = payload?.split("|") || [];
        for(let strPart of strParts) {
            try {
                console.log("this.decode", this.decode);
                let event = this.decode(strPart, (payload: string) => this.decodePayload(payload));
                if(!event) continue;
                this.captureEventHandler.produce(EventTopic.CapturedToRuler, event);
            }
            catch(err) {
                console.error(err);
            }
        }
    }


    decodePayload(payload: string) {
        let ret: Record<any, any> = {
            createdAt: new Date(),
        };

        console.log("==== [UserEventWatcher][decode] payload: ", payload);

        for(let fieldStr of payload.split(";")) {
            let pairStr = fieldStr.split(":").map((val) => val.trim());
            if(pairStr.length < 2) continue;

            switch(pairStr[0]) {
                case "id":
                    ret.id = pairStr[1] ? parseInt(pairStr[1]) : 0;
                    break;
                case "roleId":
                    ret.roleId = pairStr[1] ? parseInt(pairStr[1]) : 0;
                    break;
                case "phone":
                    ret.phone = pairStr[1] || "";
                    break;
            }
        }

        return ret;
    }
}