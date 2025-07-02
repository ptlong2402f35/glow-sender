import "dotenv/config";

export default class Config {
    public static node = process.env.NODE_ENV;
    public static tagService = process.env.TAG_SERVICE;

    public static db = {
        username: this.node === "production" ? process.env.PROD_DB_USERNAME : process.env.DEV_DB_USERNAME,
        password: this.node === "production" ? process.env.PROD_DB_PASSWORD : process.env.DEV_DB_PASSWORD,
        db: this.node === "production" ? process.env.PROD_DB : process.env.DEV_DB,
        host: this.node === "production" ? process.env.PROD_DB_HOST : process.env.DEV_DB_HOST,
        dialect: this.node === "production" ? process.env.PROD_DB_DIALECT : process.env.DEV_DB_DIALECT,
        port: this.node === "production" ? process.env.PROD_DB_PORT : process.env.DEV_DB_PORT,
    };

    public static redis = {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        pass: process.env.REDIS_PASS
    };

    public static kafka = {
        clientId: process.env.KAFKA_CLIENT_ID || "capture-sender-app",
        brokers: process.env.KAFKA_BROKERS?.split(",") || ["localhost:9094"],
        groupId: process.env.KAFKA_GROUP_ID || "treatment-ruler-group",
        autoOffsetReset: process.env.KAFKA_AUTO_OFFSET_RESET || "earliest",
        enableAutoCommit: process.env.KAFKA_ENABLE_AUTO_COMMIT === "true",
        fetchMinBytes: parseInt(process.env.KAFKA_FETCH_MIN_BYTES || "300000"),
        fetchMaxWaitMs: parseInt(process.env.KAFKA_FETCH_MAX_WAIT_MS || "3000"),
        topics: process.env.KAFKA_TOPICS?.split(";").filter(val => val) || ["talkshow"],
    }

    public static module = {
        serviceTagName: process.env.SERVICE_TAG_NAME 
    }

    public static watcher = {
        maxConnection: process.env.DB_WATCHER_MAX_CONNECTION || 2,
    }
}