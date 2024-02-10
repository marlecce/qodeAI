import RedisClient from "./redis-client";

export class RedisCodeStorage implements StorageCode {
    private redisClient: RedisClient;

    constructor(redisClient: RedisClient) {
        this.redisClient = redisClient;
    }

    async storeSourceCode(key: string, sourceCode: string, language: string): Promise<void> {
        return this.redisClient.storeSourceCode(key, sourceCode, language);
    }
}
