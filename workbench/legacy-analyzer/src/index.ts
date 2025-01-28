import path from 'path';
import fs from 'fs-extra';
import { FileScanner } from './fileScanner';
import { FileService } from './services/fileService';
import { CSharpParser } from './parser/parser';
import { OutputWriter } from './output/writer';
import logger from './utils/logger';

// Initialize logger
logger.info('Starting legacy analyzer');

// Hardcoded paths relative to this file's location
const INPUT_DIR = path.resolve(__dirname, '../../api/cbp/config/src');
const OUTPUT_DIR = path.resolve(__dirname, '../../infrastructure/models');

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
    
    logger.info(`Found ${files.length} C# files to analyze`);

    // First pass to collect all enum types
    await parser.parseFiles(files);

    // Process each file
    for (const file of files) {
        try {
            logger.info(`Processing file: ${path.basename(file)}`);
            
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
            
            logger.info(`Successfully processed ${path.basename(file)}`);
        } catch (error) {
            logger.error(`Error processing file ${file}:`, error);
        }
    }

    logger.info('Analysis complete');
}

async function main() {
    try {
        logger.info('Using configuration:', {
            inputDir: INPUT_DIR,
            outputDir: OUTPUT_DIR
        });

        await analyzeDirectory(INPUT_DIR, OUTPUT_DIR);
        logger.info('Legacy analyzer completed successfully');
    } catch (error) {
        logger.error('Legacy analyzer failed:', error);
        process.exit(1);
    }
}

main();
