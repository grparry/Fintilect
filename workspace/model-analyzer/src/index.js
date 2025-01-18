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
    
    console.log('Model directory:', modelDir);
    console.log('Output directory:', outputDir);
    
    const logger = new Logger(outputDir);
    const outputManager = new OutputManager(outputDir);
    
    try {
        console.log('Initializing model analyzer...');
        await outputManager.initialize();

        console.log('Discovering model files...');
        const files = await discoverModelFiles(modelDir, options.file, logger);
        console.log(`Found ${files.length} files to process`);

        let successCount = 0;
        let errorCount = 0;

        for (const file of files) {
            try {
                console.log(`Processing ${file}...`);
                
                // Parse the schema file
                const schemaResult = await processSchemaFile(file);
                if (!schemaResult.isValid) {
                    console.error(`Failed to parse schema file: ${file}`, schemaResult.error);
                    await outputManager.appendFileError(file, schemaResult.error);
                    errorCount++;
                    continue;
                }

                // Process the schema
                const result = processSchema(schemaResult.schema, file);
                await outputManager.processExtractionResult(result, file);
                
                if (result.success) {
                    successCount++;
                    console.log(`Successfully processed ${file}`);
                } else {
                    errorCount++;
                    console.error(`Error processing ${file}:`, result.error);
                }
            } catch (error) {
                console.error(`Error processing file ${file}:`, error);
                errorCount++;
            }
        }

        console.log(`\nProcessing complete:`);
        console.log(`- Successfully processed: ${successCount} files`);
        console.log(`- Failed to process: ${errorCount} files`);

    } catch (error) {
        console.error('Fatal error:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    main().catch(error => {
        console.error('Uncaught error:', error);
        process.exit(1);
    });
}

module.exports = { main };
