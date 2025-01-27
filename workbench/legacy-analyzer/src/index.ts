import path from 'path';
import { FileScanner } from '@legacy-analyzer/fileScanner';
import { FileService } from '@legacy-analyzer/services/fileService';
import { CSharpParser } from '@legacy-analyzer/parser/parser';
import { OutputWriter } from '@legacy-analyzer/output/writer';
import logger from '@legacy-analyzer/utils/logger';
import fs from 'fs-extra';

// Initialize logger
logger.info('Starting legacy analyzer');

const logger2 = logger;

async function analyzeDirectory(directoryPath: string, outputDir: string) {
    // Initialize services
    const fileService = new FileService(outputDir);
    const parser = new CSharpParser(fileService);
    const writer = new OutputWriter({
        outputDir,
        errorFile: 'legacy_file_errors.md'
    });

    // Initialize parser
    await parser.init();

    // Initialize output directories
    await fs.remove(outputDir);
    await fs.ensureDir(outputDir);
    await fileService.ensureOutputDirectory();

    // Initialize file scanner with target directory
    const scanner = new FileScanner(directoryPath);
    
    // Get all .cs files
    const results = await scanner.scanForFiles();
    const files = results.filter(r => !r.error).map(r => r.filePath);
    
    logger2.info(`Found ${files.length} C# files to analyze`);

    // First pass to collect all enum types
    await parser.parseFiles(files);

    // Process each file
    for (const file of files) {
        try {
            logger2.info(`Processing file: ${path.basename(file)}`);
            
            // Parse the file
            const parsedClasses = await parser.parseFile(file);
            
            // Generate documentation and TypeScript for each class
            for (const parsedClass of parsedClasses) {
                // Handle standalone enums (where the class is actually an enum)
                if (parsedClass.type === 'enum') {
                    await fileService.typeScriptWriter?.writeEnumDefinition(parsedClass, file);
                } else {
                    await writer.writeClassData(parsedClass, file);
                    await fileService.typeScriptWriter?.writeTypeDefinition(parsedClass, file);
                }
            }
            
            logger2.info(`Successfully processed ${path.basename(file)}`);
        } catch (error) {
            logger2.error(`Error processing file ${file}:`, error);
        }
    }

    logger2.info('Analysis complete');
}

async function main() {
    try {
        const args = process.argv.slice(2);
        console.log('Command line arguments:', args);
        
        const inputIndex = args.indexOf('--input');
        console.log('Input index:', inputIndex);
        const outputIndex = args.indexOf('--output');
        console.log('Output index:', outputIndex);

        if (inputIndex === -1 || outputIndex === -1 || inputIndex + 1 >= args.length || outputIndex + 1 >= args.length) {
            console.error('Usage: npm start -- --input <input_path> --output <output_path>');
            process.exit(1);
        }

        const directoryPath = args[inputIndex + 1];
        console.log('Directory path:', directoryPath);
        const outputDir = args[outputIndex + 1];
        console.log('Output directory:', outputDir);

        // Clear previous logs
        await fs.remove('logs');
        await fs.ensureDir('logs');

        await analyzeDirectory(directoryPath, outputDir);
    } catch (error) {
        logger2.error('Error:', error);
        process.exit(1);
    }
}

main();
