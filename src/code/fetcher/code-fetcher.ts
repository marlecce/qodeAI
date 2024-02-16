export interface CodeFetcher {
    cloneRepository(): Promise<void>;
    pullRepository(remote: string, branch: string): Promise<void>;
    cleanDirectory(): void;
    checkIfRepoExists(): Promise<boolean>;
}
