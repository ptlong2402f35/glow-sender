import { GeneralRedisClient } from "../../../../../services/redis/GeneralRedisClient";

 
export default class OnboardingEventCacheStrategy {
    redisClient;
    pattern: string;
    constructor() {
        this.redisClient = new GeneralRedisClient().getInstance();
        this.pattern = "cache_onboarding_event"
    }

    async get(): Promise<any[] | null> {
        try {
            let key = this.pattern;
            let rClient = await this.redisClient.getClient();
            let data: any = await rClient.GET(key);
            //cache miss
            if(!data) return null;
            console.log("=== [OnboardingEventCache] [GET] get from cache with all event user registed:", data);
            data = JSON.parse(data);
            return data;
        }
        catch(err) {
            console.log(err);
            return null;
        }
    }

    //need maintain after
    async set(data: Record<any, any>[]) {
        try {
            if(!data || !data.length) return;
            let key = this.pattern;
            let rClient = await this.redisClient.getClient();
            let prcData = JSON.stringify(data);
            await rClient.SET(key, prcData);
            console.log("=== [OnboardingEventCache] [SET] append new event onboarding to cache", data);
        }
        catch (err) {
            console.log(err);
        }
    }

}