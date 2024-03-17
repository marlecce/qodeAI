import crypto from "crypto";
import { RedisClient } from "./redis-client";
import { Language, StorageCode } from "../interfaces/storage-code";

export class RedisCodeStorage implements StorageCode {
    private redisClient: RedisClient;

    constructor(redisClient: RedisClient) {
        this.redisClient = redisClient;
    }

    async storeSourceCode(sourceCode: string, language: Language): Promise<void> {
        const hash = crypto.createHash("sha256").update(sourceCode).digest("hex");

        await this.redisClient.set(hash, sourceCode);
        await this.redisClient.sadd(language, hash);
    }

    async loadAllSourceCodeByLanguage(language: Language): Promise<(string | null)[]> {
        const hashes = await this.redisClient.smembers(language);

        const sourceCodes = await this.redisClient.mget(...hashes);

        return sourceCodes.filter((sourceCode) => sourceCode !== null);
    }
}
