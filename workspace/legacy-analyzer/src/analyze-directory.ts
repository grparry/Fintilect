import { CSharpParser } from './parser/csharpParser';
import { FileScanner } from './fileScanner';
import { OutputWriter } from './output/writer';
import path from 'path';
import fs from 'fs-extra';
import { getLogger } from './utils/logger';

const logger = getLogger('analyze-directory.ts', 'main');

async function main() {
    try {
        // Initialize parser
        const parser = new CSharpParser();
        await parser.init();

        // Initialize writer
        const outputDir = path.resolve(__dirname, '../output');
        const writer = new OutputWriter({
            outputDir,
            dataFile: 'legacy_field_data.md',
            errorFile: 'legacy_file_errors.md'
        });

        // Clear previous output files
        await fs.remove(outputDir);
        await fs.ensureDir(outputDir);
        await writer.initialize();

        // Clear previous logs
        await fs.remove('logs');
        await fs.ensureDir('logs');

        // Directory to analyze
        const targetDir = '/Users/grantparry/Documents/Fintilect/Fintilect/legacy/legacy-apis/Psi.Models.ClientConfigurationModels';
        
        // Initialize file scanner with target directory
        const scanner = new FileScanner(targetDir);
        
        // Get all .cs files
        const results = await scanner.scanForFiles();
        const files = results.filter(r => !r.error).map(r => r.filePath);
        
        logger.info(`Found ${files.length} C# files to analyze`);

        // Process each file
        for (const file of files) {
            try {
                logger.info(`Processing file: ${path.basename(file)}`);
                
                // Read file content
                const content = await fs.readFile(file, 'utf8');
                
                // Parse the file
                const classes = await parser.parseSource(content, file);
                
                // Write results
                await writer.writeClassData(classes);
                
                logger.info(`Successfully processed ${path.basename(file)}`);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                logger.error(`Error processing ${path.basename(file)}: ${errorMessage}`);
                await writer.writeError(file, new Error(errorMessage));
            }
        }

        logger.info('Analysis complete');
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        logger.error(`Fatal error: ${errorMessage}`);
        process.exit(1);
    }
}

main();
