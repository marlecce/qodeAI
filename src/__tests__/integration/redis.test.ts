import { test, assert } from "vitest";
import RedisClient from "../../redis/redis";

test("Redis Client - should connect to Redis", async () => {
    const redisClient = new RedisClient();
    const isConnected = await redisClient.isConnected();
    assert.isTrue(isConnected);
});

test("Redis Client - should set and get values from Redis", async () => {
    const redisClient = new RedisClient();
    const key = "testKey";
    const value = "testValue";

    await redisClient.set(key, value);
    const retrievedValue = await redisClient.get(key);

    assert.equal(retrievedValue, value);

    await redisClient.delete(key);
});

test("Redis Client - should return null for non-existing key", async () => {
    const redisClient = new RedisClient();
    const nonExistingKey = "nonExistingKey";
    const retrievedValue = await redisClient.get(nonExistingKey);

    assert.isNull(retrievedValue);
});
