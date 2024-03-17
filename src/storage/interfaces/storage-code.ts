export enum Language {
    TypeScript = "typescript",
    JavaScript = "javascript",
    Golang = "Golang"
}

export interface StorageCode {
    storeSourceCode(sourceCode: string, language: Language): Promise<void>;
    loadAllSourceCodeByLanguage(language: Language): Promise<(string | null)[]>;
}
