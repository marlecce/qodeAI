import Redis from "ioredis";

class RedisClient {
    private client: Redis;

    constructor() {
        this.client = new Redis({
            host: "127.0.0.1",
            port: 6379
        });

        this.client.on("error", (err) => {
            console.error("Redis connection error:", err.message);
        });
    }

    async set(key: string, value: string): Promise<string> {
        return this.client.set(key, value);
    }

    async get(key: string): Promise<string | null> {
        return this.client.get(key);
    }

    async delete(key: string): Promise<number> {
        return this.client.del(key);
    }

    async disconnect(): Promise<string> {
        return this.client.quit();
    }

    async isConnected(): Promise<boolean> {
        try {
            await this.client.ping();
            return true;
        } catch (error) {
            return false;
        }
    }
}

export default RedisClient;
