import { CodeFetcher } from "./code/fetcher/code-fetcher";
import { GitCodeFetcher } from "./code/fetcher/git/git-code-fetcher";
// import SimpleCodeProcessor from "./code/SimpleCodeProcessor";
// import { CodeProcessor } from "./code/interfaces/CodeProcessor";
// import RedisClient from "./storage/redis/RedisClient";
// import { StorageClient } from "./storage/interfaces/StorageClient";

// import * as tf from "@tensorflow/tfjs-node"; // Import TensorFlow.js

async function main() {
    if (!process.env.REPO_LOCAL_PATH) throw new Error("REPO_PATH env variable is missing: set it in your .env file");
    if (!process.env.REPO_URL) throw new Error("REPO_URL env variable is missing: set it in your .env file");

    const repoPath = process.env.REPO_LOCAL_PATH;
    const repoUrl = process.env.REPO_URL;

    // Dependency configuration
    const gitCodeFetcher: CodeFetcher = new GitCodeFetcher(repoPath, repoUrl);
    // const redisClient: StorageClient = new RedisClient({ host: "127.0.0.1", port: 6379 });
    // const codeProcessor: CodeProcessor = new SimpleCodeProcessor();

    // Clone, pull, and fetch code
    await gitCodeFetcher.cloneRepository();

    // // Extract and preprocess code
    // const rawCode = await gitCodeFetcher.fetchCode();
    // const processedCode = codeProcessor.process(rawCode);

    // // Save preprocessed code to storage (e.g., Redis)
    // await redisClient.save("repositoryCode", processedCode);

    // // Check the connection status to Redis
    // const isConnected = await redisClient.isConnected();
    // console.log("Redis connection status:", isConnected);

    // // Retrieve preprocessed code from storage
    // const retrievedCode = await redisClient.get("repositoryCode");
    // console.log("Retrieved code:", retrievedCode);

    // Model training (example with TensorFlow.js)
    // const model = tf.sequential({
    //     layers: [tf.layers.dense({ units: 1, inputShape: [1] })]
    // });

    // model.compile({ optimizer: "sgd", loss: "meanSquaredError" });

    // // Training data (example with random data)
    // const x = tf.tensor2d([[1], [2], [3], [4]], [4, 1]);
    // const y = tf.tensor2d([[2], [4], [6], [8]], [4, 1]);

    // // Model training
    // await model.fit(x, y, { epochs: 100 });

    // // Make predictions with the trained model
    // const prediction = model.predict(tf.tensor2d([[5]], [1, 1]));
    // console.log("Prediction:", prediction.dataSync()[0]);
}

// Run the main function
main();
