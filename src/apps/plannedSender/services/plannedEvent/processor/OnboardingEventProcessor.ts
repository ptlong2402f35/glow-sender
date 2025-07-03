import { OnboardingEventHandler } from "../handler/OnboardingEventHandler";
const EnableOnboardingEventProcessor = process.env.ENABLE_ONBOARDING_EVENT_PROCESSOR?.trim() === "true";
const OnboardingEventProcessorFlushInterval = process.env.ONBOARDING_EVENT_PROCESSOR_FLUSH_INTERVAL ? parseInt(process.env.ONBOARDING_EVENT_PROCESSOR_FLUSH_INTERVAL) : 300000;

export class OnboardingEventProcessor {
    static instance: OnboardingEventProcessor;

    onboardingEventHandler: OnboardingEventHandler;
    fetchTimer: any;
    constructor() {}

    getInstance() {
        if(!OnboardingEventProcessor.instance) {
            OnboardingEventProcessor.instance = new OnboardingEventProcessor();
        }
        return OnboardingEventProcessor.instance;
    }

    async init() {
        if(EnableOnboardingEventProcessor) {
            this.fetchTimer = setInterval(async () => await this.flush(), OnboardingEventProcessorFlushInterval);
            console.log(`==== [OnboardingEventProcessor] done init`);
        }
    }

    async stop() {
		try {
			console.log(`[OnboardingEventProcessor] stop`);
			if(this.fetchTimer) {
				clearInterval(this.fetchTimer);
			}
		} catch (err) {
			console.log(err);
		}
	}

    async flush() {
        try {
            await this.onboardingEventHandler.onProcessEvent();
        }
        catch (err: any) {
            console.error(err);
        }
    }
}