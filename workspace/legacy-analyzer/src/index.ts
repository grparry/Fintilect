import path from 'path';
import { FileScanner, ScannerOptions } from './fileScanner';
import { CSharpParser } from './parser/csharpParser';
import { OutputWriter } from './output/writer';
import { logger } from './utils/logger';
import fs from 'fs-extra';

async function main() {
    try {
        // Get source directory from command line args
        const sourceDir = process.argv[2];
        if (!sourceDir) {
            console.error('Please provide a source directory path');
            process.exit(1);
        }

        // Initialize components
        const scanner = new FileScanner(sourceDir, { recursive: true });
        const writer = new OutputWriter({
            outputDir: path.join(process.cwd(), 'output'),
            dataFile: 'legacy_field_data.md',
            errorFile: 'legacy_field_errors.md'
        });

        // Initialize output directory
        await writer.initialize();

        // Scan for C# files
        const files = await scanner.scanForFiles();
        logger.info(`Found ${files.length} C# files to analyze`);

        // Process each file
        for (const file of files) {
            try {
                if (file.error) {
                    await writer.writeError(file.filePath, new Error(file.error));
                    continue;
                }
                
                const content = await fs.readFile(file.filePath, 'utf-8');
                
                // Create a new parser instance and initialize it
                const fileParser = new CSharpParser();
                try {
                    await fileParser.init();
                    const parsedClasses = await fileParser.parseSource(content, file.filePath);
                    if (parsedClasses.length > 0) {
                        await writer.writeClassData(parsedClasses);
                    }
                } catch (parseError) {
                    await writer.writeError(file.filePath, parseError instanceof Error ? parseError : new Error(String(parseError)));
                }
            } catch (error) {
                if (error instanceof Error) {
                    await writer.writeError(file.filePath, error);
                }
            }
        }

        logger.info('Analysis complete. Check the output directory for results.');
    } catch (error) {
        logger.error('Failed to complete analysis', { error });
        process.exit(1);
    }
}

main();
