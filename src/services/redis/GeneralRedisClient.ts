import { RedisClientType } from "@redis/client";
import redis from "redis";
const createClient = redis.createClient;

const RedisHost = process.env.REDIS_HOST || "";
const RedisPort = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379;
const RedisUser = process.env.REDIS_USER || "";
const RedisPassword = process.env.REDIS_PASS || "";

async function createRedisClient() {
	console.log(`node-redis version is ${require("redis/package.json").version}`);
	let client = createClient({
		url: `redis://${RedisUser}:${RedisPassword}@${RedisHost}:${RedisPort}`,
	});
	client.on("error", err => console.log("Redis Client Error", err));
	await client.connect();

	return client;
}

export class GeneralRedisClient {
	static instance: GeneralRedisClient;
	rawClient: RedisClientType<any, any, any>;
	initPromise: Promise<RedisClientType<any, any, any>>;

	constructor() {
		//empty
	}

	getInstance() {
		if (!GeneralRedisClient.instance) {
			GeneralRedisClient.instance = new GeneralRedisClient();
		}
		return GeneralRedisClient.instance;
	}

	async getClient() {
		if(!this.initPromise) {
			let prom = async () => {
				this.rawClient = await createRedisClient();
				console.log(`[GeneralRedisClient] inited successfully`);
				return this.rawClient;
			};
			this.initPromise = prom();
		}
		return (await this.initPromise);
	}

	async getClient_() {
		if (!this.rawClient) {
			this.rawClient = await createRedisClient();
			console.log(`[GeneralRedisClient] inited successfully`);
		}
		return this.rawClient;
	}

	async disconnect() {
		if(this.rawClient) {
			try {
				if(this.rawClient.isOpen) {
					await this.rawClient.disconnect();
					console.log(`[GeneralRedisClient] stopped`);
				}
			}
			catch(err) {
				console.error(err);
			}
		}
	}
}

module.exports = {
	RedisHost,
	RedisPort,
	RedisUser,
	RedisPassword,
	createRedisClient,
	GeneralRedisClient,
};
