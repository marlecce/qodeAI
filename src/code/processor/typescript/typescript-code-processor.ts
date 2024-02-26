import { Project, SourceFile, SyntaxKind, Node, Identifier, VariableDeclaration } from "ts-morph";
import { CodeProcessor } from "../code-processor";
import { Language, StorageCode } from "../../../storage/interfaces/storage-code";

export class TypeScriptProcessor implements CodeProcessor {
    private project: Project;
    private storage: StorageCode;

    constructor(storage: StorageCode) {
        this.project = new Project();
        this.storage = storage;
    }

    setProject(project: Project) {
        this.project = project;
    }

    async processRepository(repoPath: string): Promise<void> {
        try {
            const sourceFiles = this.loadSourceFiles(repoPath);
            const totalFiles = sourceFiles.length;
            let processedFiles = 0;

            for (const sourceFile of sourceFiles) {
                const processedCode = this.processSourceFile(sourceFile);

                await this.storage.storeSourceCode(processedCode, Language.TypeScript);

                processedFiles++;
                const completionPercentage = (processedFiles / totalFiles) * 100;
                console.log(`Processing: ${completionPercentage.toFixed(2)}%`);
            }
        } catch (error) {
            console.error("Error processing repository:", error);
        }
    }

    private loadSourceFiles(repoPath: string): SourceFile[] {
        return this.project.addSourceFilesAtPaths(`${repoPath}/**/*.ts`);
    }

    private processSourceFile(sourceFile: SourceFile): string {
        sourceFile.getDescendants().forEach((node) => this.processNode(node));
        sourceFile.formatText();
        return sourceFile.getFullText();
    }

    private processNode(node: Node): void {
        switch (node.getKind()) {
            case SyntaxKind.Identifier:
                this.processIdentifier(node as Identifier);
                break;
            case SyntaxKind.VariableDeclaration:
                this.processVariableDeclaration(node as VariableDeclaration);
                break;
            case SyntaxKind.SingleLineCommentTrivia:
            case SyntaxKind.MultiLineCommentTrivia:
                node.replaceWithText("");
                break;

            default:
                node.forEachChild((childNode) => {
                    this.processNode(childNode);
                });
                break;
        }
    }

    private processIdentifier(identifier: Identifier): void {
        const normalizedIdentifier = identifier.getText().toLowerCase();
        identifier.replaceWithText(normalizedIdentifier);
    }

    private normalizeName(name: string): string {
        return name.toLowerCase();
    }

    private processVariableDeclaration(variableDeclaration: VariableDeclaration): void {
        const name = variableDeclaration.getName();
        const newName = this.normalizeName(name);
        variableDeclaration.rename(newName);
    }
}
