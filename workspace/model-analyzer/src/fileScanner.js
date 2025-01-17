const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');

/**
 * Discovers JSON model files in the specified directory
 * @param {string} baseDir - Base directory to start scanning from
 * @param {string} [singleFile] - Optional specific file to process
 * @param {object} logger - Logger instance for output
 * @returns {Promise<Array<string>>} Array of absolute file paths
 */
async function discoverModelFiles(baseDir, singleFile = null, logger) {
    try {
        if (singleFile) {
            const absolutePath = path.resolve(baseDir, singleFile);
            if (!await fs.pathExists(absolutePath)) {
                throw new Error(`File not found: ${absolutePath}`);
            }
            if (path.extname(absolutePath) !== '.json') {
                throw new Error(`File is not a JSON file: ${absolutePath}`);
            }
            return [absolutePath];
        }

        // Use glob to find all JSON files recursively
        const pattern = path.join(baseDir, '**/*.json');
        const files = await glob(pattern, { 
            nodir: true,
            absolute: true,
            ignore: ['**/node_modules/**']
        });

        if (files.length === 0) {
            // Not throwing an error here as having no files is a valid case
            logger.log('No JSON files found in the specified directory');
            return [];
        }

        return files;
    } catch (error) {
        logger.error('Error discovering model files:', error);
        throw error;
    }
}

/**
 * Validates that a file exists and is accessible
 * @param {string} filePath - Path to the file to validate
 * @returns {Promise<boolean>} True if file is valid and accessible
 */
async function validateFile(filePath) {
    try {
        const stats = await fs.stat(filePath);
        return stats.isFile();
    } catch (error) {
        return false;
    }
}

module.exports = {
    discoverModelFiles,
    validateFile
};
