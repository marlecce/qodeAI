import { test, assert, beforeAll, afterAll } from "vitest";
import { RedisClient } from "../../storage/redis/redis-client";

let redisClient: RedisClient;

beforeAll(async () => {
    redisClient = new RedisClient({
        host: process.env.VITE_REDIS_HOST,
        port: Number(process.env.VITE_REDIS_PORT)
    });
});

afterAll(async () => {
    await redisClient.quit();
});

test("Redis Client - should connect to Redis", async () => {
    const isConnected = await redisClient.isConnected();
    assert.isTrue(isConnected);
});

test("Redis Client - should set and get values from Redis", async () => {
    const key = "testKey";
    const value = "testValue";

    await redisClient.set(key, value);
    const retrievedValue = await redisClient.get(key);

    assert.equal(retrievedValue, value);

    await redisClient.del(key);
});

test("Redis Client - should return null for non-existing key", async () => {
    const nonExistingKey = "nonExistingKey";
    const retrievedValue = await redisClient.get(nonExistingKey);

    assert.isNull(retrievedValue);
});
