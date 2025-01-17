const path = require('path');
const { program } = require('commander');
const { discoverModelFiles } = require('./fileScanner');
const { processSchema } = require('./fieldExtractor');
const { processSchemaFile } = require('./schemaParser');
const OutputManager = require('./outputManager');
const Logger = require('./utils/logger');

async function main() {
    program
        .option('-d, --model-dir <dir>', 'Directory containing model files', './models')
        .option('-o, --output-dir <dir>', 'Directory for output files', './output')
        .option('-f, --file <file>', 'Process a single file')
        .parse();

    const options = program.opts();
    const modelDir = path.resolve(options.modelDir);
    const outputDir = path.resolve(options.outputDir);
    
    const logger = new Logger(outputDir);
    const outputManager = new OutputManager(outputDir);
    
    try {
        logger.log('Initializing model analyzer...');
        await outputManager.initialize();

        logger.log('Discovering model files...');
        const files = await discoverModelFiles(modelDir, options.file, logger);
        logger.log(`Found ${files.length} files to process`);

        let successCount = 0;
        let errorCount = 0;

        for (const file of files) {
            try {
                logger.log(`Processing ${file}...`);
                
                // Parse the schema file
                const schemaResult = await processSchemaFile(file);
                if (!schemaResult.isValid) {
                    logger.error(`Failed to parse schema file: ${file}`, schemaResult.error);
                    await outputManager.appendFileError(file);
                    errorCount++;
                    continue;
                }

                // Process the schema
                const result = processSchema(schemaResult.schema, file);
                await outputManager.processExtractionResult(result, file);
                
                if (result.success) {
                    successCount++;
                } else {
                    errorCount++;
                }
            } catch (error) {
                logger.error(`Error processing file: ${file}`, error);
                await outputManager.appendFileError(file);
                errorCount++;
            }
        }

        logger.log('Analysis complete!');
        logger.log(`Processed ${successCount} files successfully`);
        if (errorCount > 0) {
            logger.log(`Encountered errors in ${errorCount} files`);
        }

        logger.log(`Output files can be found in: ${outputDir}`);
        logger.log('- model_field_data.md: Successfully extracted field data');
        logger.log('- model_file_errors.md: Files that could not be processed');
        logger.log('- model_field_errors.md: Fields with missing information');
        
        return { success: true, outputDir };
    } catch (error) {
        logger.error('Fatal error', error);
        process.exit(1);
    }
}

if (require.main === module) {
    main().catch(error => {
        // Create a temporary logger for uncaught errors
        const logger = new Logger('./output');
        logger.error('Uncaught error', error);
        process.exit(1);
    });
}

module.exports = { main };
