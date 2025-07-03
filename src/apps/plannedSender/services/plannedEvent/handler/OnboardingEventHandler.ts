import PlannedEventHandler from "~/apps/plannedSender/handler/PlannedEventHandler";
import OnboardingEventCacheStrategy from "../strategy/OnboardingEventCacheStrategy";
import { EventTopic, EventType } from "~/services/eventHandler/EventHandler";
const OnboardingTriggerEventTimer = process.env.ONBOARDING_TRIGGER_EVENT_TIMER ? parseInt(process.env.ONBOARDING_TRIGGER_EVENT_TIMER) : 8640000 // 1 day

export class OnboardingEventHandler {
    strategy: OnboardingEventCacheStrategy;
    plannedEventHandler: PlannedEventHandler;

    constructor() {
        this.strategy = new OnboardingEventCacheStrategy();
        this.plannedEventHandler = new PlannedEventHandler();
    }

    public async onSaveEvent(data: Record<any, any>) {
        let cache = await this.getEvent();
        if(!cache) {
            await this.strategy.set([this.build(data)]);

            return;
        }
        await this.strategy.set([...cache, this.build(data)])
    }

    public async onProcessEvent() {
        console.log("==== [OnboardingEvent] start process manually");
        let cache = await this.getEvent();
        if(!cache) return;
        let current = new Date().getTime();
        let triggerEvents = cache.filter(item => item.triggerTime >= current);
        let saveEvents = cache.filter(item => item.triggerTime < current);
        await this.strategy.set([...saveEvents]);
        //process trigger events ---> need to update to batch produce
        for(let event of triggerEvents) {
            await this.plannedEventHandler.produce(EventTopic.PlannedToRuler, event, EventType.SignUpNotiAction);
        }
    }

    public async getEvent() {
        return await this.strategy.get();
    }

    public build(data: Record<any, any>) {
        let current = new Date().getTime();

        return {
            id: data.id,
            userId: data.userId,
            phone: data.phone,
            roleId: data.roleId,
            createdAt: data.createdAt?.getTime() || current,
            triggerTime: current + OnboardingTriggerEventTimer
        }
    }
}