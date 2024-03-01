import * as fs from "fs";

import { BERTModel } from "./ai/model/BERTModel";
import { CodeFetcher } from "./code/fetcher/code-fetcher";
import { GitCodeFetcher } from "./code/fetcher/git/git-code-fetcher";
import { CodeProcessor } from "./code/processor/code-processor";
import { TypeScriptProcessor } from "./code/processor/typescript/typescript-code-processor";
import { Language } from "./storage/interfaces/storage-code";
import { RedisClient } from "./storage/redis/redis-client";
import { RedisCodeStorage } from "./storage/redis/redis-code-storage";

async function main() {
    if (!process.env.REPO_LOCAL_PATH)
        throw new Error("REPO_LOCAL_PATH env variable is missing: set it in your .env file");
    if (!process.env.REPO_URL) throw new Error("REPO_URL env variable is missing: set it in your .env file");

    const repoPath = process.env.REPO_LOCAL_PATH;
    const repoUrl = process.env.REPO_URL;

    if (fs.existsSync(repoPath)) {
        fs.rmSync(repoPath, { force: true, recursive: true });
    }
    fs.mkdirSync(repoPath);

    // Dependency configuration
    const gitCodeFetcher: CodeFetcher = new GitCodeFetcher(repoPath, repoUrl);
    const redisClient = new RedisClient({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    });
    const redisStorage = new RedisCodeStorage(redisClient);
    const codeProcessor: CodeProcessor = new TypeScriptProcessor(redisStorage);

    // Clone, pull, and fetch code
    await gitCodeFetcher.cloneRepository();

    // Extract and preprocess code
    codeProcessor.processRepository(repoPath);

    // Create an instance of BERTModel with appropriate parameters
    const bertModel = new BERTModel(redisStorage, Language.TypeScript);

    // Train the model
    await bertModel.train();

    // Generate suggestions for new code
    const newCode = `/* Insert new code here */`;
    const suggestions = await bertModel.generateSuggestions(newCode);

    console.log("Suggestions for the new code:");
    console.log(suggestions);
}

// Run the main function
main();
