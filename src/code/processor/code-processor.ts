export interface CodeProcessor {
    processRepository(repoPath: string): Promise<void>;
}
