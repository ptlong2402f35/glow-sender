import createSubscriber, { Subscriber } from "pg-listen";
import Config from "../../../../config/Config";

const WatcherMaxConnection = process.env.DB_WATCHER_MAX_CONNECTION ? parseInt(process.env.DB_WATCHER_MAX_CONNECTION) : 2;

const DBConfig = Config.db;
const WathcherConfig = Config.watcher;

export default class PGWatcher {
    static instance: PGWatcher;
    subscriber: Subscriber;

    constructor() {
    }

    getInstance() {
        if(!PGWatcher.instance) {
            PGWatcher.instance = new PGWatcher();
        }
        return PGWatcher.instance;
    }

    async init() {
        this.subscriber = createSubscriber({
            database: DBConfig.db,
            host: DBConfig.host,
            port: DBConfig.port,
            user: DBConfig.username,
            password: DBConfig.password,
            ssl: false,
            max: WathcherConfig.maxConnection,
        });

        this.subscriber.events.on("error", (error) => {
            console.error("==== [PGWatcher] Connection error:", error);
        });

        await this.subscriber.connect();
        console.log(`==== [PGWatcher] Connected successfully`);
    }

    async close() {
        await this.subscriber.close();
        console.log(`==== [PGWatcher] stop`);
    }

    async register(channel: string, handler: any) {
        await this.subscriber.listenTo(channel);
        this.subscriber.notifications.on(channel, handler);
    }
}