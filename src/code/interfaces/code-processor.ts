export interface CodeProcessor {
    process(rawCode: string): string;
}
