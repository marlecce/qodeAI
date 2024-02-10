interface StorageCode {
    storeSourceCode(key: string, sourceCode: string, language: string): Promise<void>;
}
