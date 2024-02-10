// code/git/GitCodeFetcher.ts
import { CodeFetcher } from "../interfaces/code-fetcher";
import simpleGit, { SimpleGit } from "simple-git";
import * as fs from "fs";

class GitCodeFetcher implements CodeFetcher {
    private localFolder: string;
    private repoUrl: string;
    private git: SimpleGit;

    constructor(localFolder: string, repoUrl: string) {
        this.localFolder = localFolder;
        this.repoUrl = repoUrl;
        this.git = simpleGit(this.localFolder);
    }

    async cloneRepository(): Promise<void> {
        try {
            await this.git.clone(this.repoUrl);
        } catch (error) {
            console.error("Error during repository clone:", error);
            throw error;
        }
    }

    async pullRepository(remote: string, branch: string): Promise<void> {
        try {
            const isRepoExists = await this.git.checkIsRepo();

            if (isRepoExists) {
                await this.git.pull(remote, branch);
            }
        } catch (error) {
            console.error("Error during repository pull:", error);
            throw error;
        }
    }

    cleanDirectory(): void {
        try {
            if (fs.existsSync(this.localFolder)) {
                fs.rmdirSync(this.localFolder, { recursive: true });
            }
        } catch (error) {
            console.error("Error during directory cleanup:", error);
        }
    }

    async checkIfRepoExists(): Promise<boolean> {
        try {
            return await this.git.checkIsRepo();
        } catch (error) {
            console.error("Error checking if repository exists:", error);
            return false;
        }
    }
}

export default GitCodeFetcher;
