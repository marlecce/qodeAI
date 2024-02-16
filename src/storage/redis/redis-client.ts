import Redis, { RedisOptions } from "ioredis";
import { StorageClient } from "../interfaces/storage-client";

export class RedisClient extends Redis implements StorageClient {
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

    storeSourceCode(key: string, sourceCode: string, language: string) {
        throw new Error("Method not implemented.");
    }
}
