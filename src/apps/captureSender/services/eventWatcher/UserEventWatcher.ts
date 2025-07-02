import CaptureEventHandler from "../../handler/CaptureEventHandler";
import EventWatcher from "./EventWatcher";
import PGWatcher from "./PGWatcher";
const UserRegisterKafkaTopic = process.env.USER_REGISTER_KAFKA_TOPIC || "sign_up";
const UserRegisterEventChannel = process.env.USER_REGISTER_EVENT_CHANNEL || "user-register-event"; 

export default class UserEventWatcher extends EventWatcher{
    static instance: UserEventWatcher;
    pgWatcher: PGWatcher;
    startState: boolean;
    captureEventHandler: CaptureEventHandler;
    kafkaTopic: string = UserRegisterKafkaTopic;

    constructor() {
        super();
        this.pgWatcher = new PGWatcher().getInstance();
    }

    async init() {
        await this.pgWatcher.register(UserRegisterEventChannel, this.handle);
        this.startState = true;
    }

    async stop(): Promise<void> {
        this.startState = false;
        console.log("[==== UserEventWatcher] stopped!!");
    }

    async handle(payload: string): Promise<void> {
        if(!this.startState) return;

        console.log(`==== [UserEventWatcher][handle] payload: `, payload);

        let strParts = payload?.split("|") || [];
        for(let strPart of strParts) {
            try {
                let event = this.decode(strPart, this.decodePayload);
                if(!event) continue;
                this.captureEventHandler.produce(this.kafkaTopic, event);
            }
            catch(err) {
                console.error(err);
            }
        }
    }


    async decodePayload(payload: string) {
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

    }
}