interface Filter {
    [key: string]: string;
}
interface ConvertOptions {
    inputFile: string;
    outputDir: string;
    outputFilename?: string;
    filter?: Filter;
}
interface ConvertResult {
    outputPath: string;
}
declare function convertXlsxToCsv(options: ConvertOptions): Promise<ConvertResult>;

export { type ConvertOptions, type ConvertResult, type Filter, convertXlsxToCsv };
