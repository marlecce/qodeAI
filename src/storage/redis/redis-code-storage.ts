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

        await this.redisClient.sadd("preprocessed_files", hash);

        await this.redisClient.hmset(hash, {
            language: language
            // add metadata
        });
    }

    async loadAllSourceCodeByLanguage(language: Language): Promise<Map<string, string>> {
        const keys: string[] = [];
        let cursor = "0";

        do {
            const [newCursor, scannedKeys] = await this.redisClient.scan(cursor, "MATCH", "*", "COUNT", "1000");
            keys.push(...scannedKeys);
            cursor = newCursor;
        } while (cursor !== "0");

        const languageKeys = keys.filter(async (key) => (await this.redisClient.hget(key, "language")) === language);
        const sourceCodeMap = new Map<string, string>();

        for (const key of languageKeys) {
            const sourceCode = await this.redisClient.get(key);
            if (sourceCode) {
                sourceCodeMap.set(key, sourceCode);
            }
        }

        return sourceCodeMap;
    }
}
