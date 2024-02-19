import crypto from "crypto";
import { RedisClient } from "./redis-client";

export class RedisCodeStorage implements StorageCode {
    private redisClient: RedisClient;

    constructor(redisClient: RedisClient) {
        this.redisClient = redisClient;
    }

    async storeSourceCode(sourceCode: string, language: Language): Promise<void> {
        const hash = crypto.createHash("sha256").update(sourceCode).digest("hex");

        await this.redisClient.set(hash, sourceCode);

        await this.redisClient.sadd("preprocessed_files", hash);

        await this.redisClient.hmset(hash, {
            language: language
            // add metadata
        });
    }
}
