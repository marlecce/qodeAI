import { describe, it, assert, beforeEach, afterEach } from "vitest";
import * as fs from "fs";
import { GitCodeFetcher } from "../../code/fetcher/git/git-code-fetcher";

const TEST_REPO_LOCAL_PATH = process.env.VITE_REPO_LOCAL_PATH || "";
const REPO_URL = process.env.VITE_REPO_URL || "";

describe("GitCodeFetcher tests", () => {
    let gitCodeFetcher: GitCodeFetcher;

    beforeEach(async () => {
        try {
            if (!fs.existsSync(TEST_REPO_LOCAL_PATH)) {
                fs.mkdirSync(TEST_REPO_LOCAL_PATH);
            }
            gitCodeFetcher = new GitCodeFetcher(TEST_REPO_LOCAL_PATH, REPO_URL);
        } catch (err) {
            console.error(err);
        }
    });

    afterEach(async () => {
        gitCodeFetcher.cleanDirectory();
    });

    it("cleanDirectory", async () => {
        await gitCodeFetcher.cloneRepository();

        let isLocalFolderExistsBefore = true;
        try {
            await fs.promises.access(TEST_REPO_LOCAL_PATH);
        } catch (error) {
            isLocalFolderExistsBefore = false;
        }
        assert.isTrue(isLocalFolderExistsBefore, "Local directory should exist before cleaning");

        gitCodeFetcher.cleanDirectory();

        let isLocalFolderExistsAfter = true;
        try {
            await fs.promises.access(TEST_REPO_LOCAL_PATH);
        } catch (error) {
            isLocalFolderExistsAfter = false;
        }
        assert.isFalse(isLocalFolderExistsAfter, "Local directory should not exist after cleaning");
    });

    it("cloneRepository", async () => {
        await gitCodeFetcher.cloneRepository();

        const isRepoExists = await gitCodeFetcher.checkIfRepoExists();
        assert.isTrue(isRepoExists, "Repository should exist after cloning");
    });

    it("pullRepository", async () => {
        await gitCodeFetcher.cloneRepository();
        await gitCodeFetcher.pullRepository("origin", "main");

        const isRepoExists = await gitCodeFetcher.checkIfRepoExists();
        assert.isTrue(isRepoExists, "Repository should exist after pulling");
    });

    it("checkIfRepoExists", async () => {
        await gitCodeFetcher.cloneRepository();

        const isRepoExistsAfter = await gitCodeFetcher.checkIfRepoExists();
        assert.isTrue(isRepoExistsAfter, "Repository should exist after cloning");

        gitCodeFetcher.cleanDirectory();

        const isRepoExistsBefore = await gitCodeFetcher.checkIfRepoExists();
        assert.isFalse(isRepoExistsBefore, "Repository should not exist before cloning");
    });
});
