import Redis, { RedisOptions } from "ioredis";

class RedisClient extends Redis {
    constructor(options: RedisOptions) {
        super(options);
    }

    async isConnected(): Promise<boolean> {
        try {
            await this.ping();
            return true;
        } catch (error) {
            return false;
        }
    }
}

export default RedisClient;
