import { describe, expect, vi, it } from "vitest";
import { Project } from "ts-morph";
import { TypeScriptProcessor } from "../../code/processor/typescript/typescript-code-processor";

describe("TypeScriptProcessor", () => {
    it("processRepository should process source files correctly", async () => {
        // Mock Project
        const projectMock = new Project();

        // Mock addSourceFilesAtPaths to return a single source file
        const sourceFileMock = projectMock.createSourceFile("sourceFile.ts");
        projectMock.addSourceFilesAtPaths = () => [sourceFileMock];

        // Spy on processSourceFile
        const processSourceFileSpy = vi.spyOn(TypeScriptProcessor.prototype as any, "processSourceFile");

        // Create TypeScriptProcessor instance
        const processor = new TypeScriptProcessor(projectMock);

        // Call processRepository with a mock repository path
        await processor.processRepository("/mock/repo/path");

        // Assertions
        expect(processSourceFileSpy).toHaveBeenCalled();
        expect(processSourceFileSpy).toHaveBeenCalledWith(sourceFileMock);
    });

    it("processSourceFile - should preprocess a TypeScript source file", async () => {
        const fakeRepoPath = "/mock/repo/path";
        const sourceFilePath = "sourceFile.ts";

        const sourceCode = `
            // Sample TypeScript code
            let myVariable: string = "Hello, world!";
            console.log(myVariable);
        `;

        // Mock Project
        const projectMock = new Project();

        // Mock addSourceFilesAtPaths to return a single source file
        const sourceFileMock = projectMock.createSourceFile(sourceFilePath, sourceCode);
        projectMock.addSourceFilesAtPaths = () => [sourceFileMock];

        // Spy on processSourceFile
        const processSourceFileSpy = vi.spyOn(TypeScriptProcessor.prototype as any, "processSourceFile");

        // Create TypeScriptProcessor instance
        const processor = new TypeScriptProcessor(projectMock);

        // Call processRepository with a mock repository path
        await processor.processRepository(fakeRepoPath);

        // Assertions
        expect(processSourceFileSpy).toHaveBeenCalled();
        expect(processSourceFileSpy).toHaveBeenCalledWith(sourceFileMock);

        const processedSourceFile = projectMock.getSourceFiles()[0];
        expect(processedSourceFile.getFullText()).includes('let myvariable: string = "Hello, world!";');
        expect(processedSourceFile.getFullText()).includes("console.log(myvariable);");
    });
});
