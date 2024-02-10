export interface StorageClient {
    isConnected(): Promise<boolean>;
}
