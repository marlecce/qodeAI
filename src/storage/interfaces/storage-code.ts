enum Language {
    TypeScript = "typescript",
    JavaScript = "javascript",
    Golang = "Golang"
}

interface StorageCode {
    storeSourceCode(sourceCode: string, language: Language): Promise<void>;
}
