const fs = require('fs-extra');
const path = require('path');

/**
 * Manages output files for the model analyzer
 */
class OutputManager {
    /**
     * @param {string} outputDir - Directory where output files will be created
     */
    constructor(outputDir) {
        this.outputDir = outputDir;
        this.fieldDataFile = path.join(outputDir, 'model_field_data.md');
        this.fileErrorsFile = path.join(outputDir, 'model_file_errors.md');
        this.fieldErrorsFile = path.join(outputDir, 'model_field_errors.md');
    }

    /**
     * Initialize output files with headers
     */
    async initialize() {
        await fs.ensureDir(this.outputDir);

        // Initialize model_field_data.md
        const fieldDataHeader = '| Source Model | Field Name | Legacy Model | Setting Key |\n' +
                              '|--------------|------------|--------------|-------------|\n';
        await fs.writeFile(this.fieldDataFile, fieldDataHeader);

        // Initialize model_file_errors.md
        const fileErrorsHeader = '# Model File Processing Errors\n\n';
        await fs.writeFile(this.fileErrorsFile, fileErrorsHeader);

        // Initialize model_field_errors.md
        const fieldErrorsHeader = '# Field Processing Errors\n\n' +
                                '| Source Model | Field Name | Legacy Model | Setting Key |\n' +
                                '|--------------|------------|--------------|-------------|\n';
        await fs.writeFile(this.fieldErrorsFile, fieldErrorsHeader);
    }

    /**
     * Append field data to model_field_data.md
     * @param {string} sourceModel - Relative path to the source model file
     * @param {string} fieldName - Name of the field
     * @param {string|null} legacyModel - Associated legacy model
     * @param {string|null} settingKey - Associated setting key
     */
    async appendFieldData(sourceModel, fieldName, legacyModel, settingKey) {
        const row = `| ${sourceModel} | ${fieldName} | ${legacyModel || ''} | ${settingKey || ''} |\n`;
        await fs.appendFile(this.fieldDataFile, row);
    }

    /**
     * Append file error to model_file_errors.md
     * @param {string} filePath - Path to the file that couldn't be processed
     */
    async appendFileError(filePath) {
        const entry = `- ${filePath}\n`;
        await fs.appendFile(this.fileErrorsFile, entry);
    }

    /**
     * Append field error to model_field_errors.md
     * @param {string} sourceModel - Relative path to the source model file
     * @param {string} fieldName - Name of the field
     * @param {string|null} legacyModel - Associated legacy model if found
     * @param {string|null} settingKey - Associated setting key if found
     */
    async appendFieldError(sourceModel, fieldName, legacyModel, settingKey) {
        const row = `| ${sourceModel} | ${fieldName} | ${legacyModel || '[not found]'} | ${settingKey || '[not found]'} |\n`;
        await fs.appendFile(this.fieldErrorsFile, row);
    }

    /**
     * Process extracted fields and write to appropriate output files
     * @param {Object} result - Result from field extraction
     * @param {string} relativePath - Relative path to the source file
     */
    async processExtractionResult(result, relativePath) {
        if (!result.success) {
            await this.appendFileError(relativePath);
            return;
        }

        for (const field of result.fields) {
            if (field.legacyModel && field.settingKey) {
                await this.appendFieldData(
                    relativePath,
                    field.fieldName,
                    field.legacyModel,
                    field.settingKey
                );
            } else {
                await this.appendFieldError(
                    relativePath,
                    field.fieldName,
                    field.legacyModel,
                    field.settingKey
                );
            }
        }
    }
}

module.exports = OutputManager;
