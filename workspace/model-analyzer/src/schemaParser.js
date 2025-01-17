const fs = require('fs-extra');

/**
 * Reads and parses a JSON schema file
 * @param {string} filePath - Path to the JSON schema file
 * @returns {Promise<Object>} Parsed JSON schema
 * @throws {Error} If file cannot be read or parsed
 */
async function readJsonSchema(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const parsed = JSON.parse(content);
        
        // If the schema is wrapped in a root object, use the first property
        if (Object.keys(parsed).length === 1) {
            return parsed[Object.keys(parsed)[0]];
        }
        
        return parsed;
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error(`Invalid JSON in file ${filePath}: ${error.message}`);
        }
        throw new Error(`Failed to read file ${filePath}: ${error.message}`);
    }
}

/**
 * Validates that the parsed content is a JSON schema
 * @param {Object} schema - Parsed JSON content
 * @returns {boolean} True if content appears to be a JSON schema
 */
function isJsonSchema(schema) {
    // Basic validation - checks for common JSON Schema keywords
    return (
        typeof schema === 'object' &&
        schema !== null &&
        (
            schema.hasOwnProperty('type') ||
            schema.hasOwnProperty('properties') ||
            schema.hasOwnProperty('items') ||
            schema.hasOwnProperty('$schema')
        )
    );
}

/**
 * Extracts the root-level x-legacy-model from a schema
 * @param {Object} schema - Parsed JSON schema
 * @returns {string|null} The x-legacy-model value if found, null otherwise
 */
function extractRootLegacyModel(schema) {
    return schema['x-legacy-model'] || null;
}

/**
 * Process a JSON schema file and extract relevant information
 * @param {string} filePath - Path to the JSON schema file
 * @returns {Promise<Object>} Object containing schema info
 */
async function processSchemaFile(filePath) {
    try {
        const schema = await readJsonSchema(filePath);
        
        if (!isJsonSchema(schema)) {
            throw new Error(`File ${filePath} does not appear to be a JSON schema`);
        }

        return {
            filePath,
            schema,
            rootLegacyModel: extractRootLegacyModel(schema),
            isValid: true
        };
    } catch (error) {
        return {
            filePath,
            schema: null,
            rootLegacyModel: null,
            isValid: false,
            error: error.message
        };
    }
}

module.exports = {
    readJsonSchema,
    isJsonSchema,
    extractRootLegacyModel,
    processSchemaFile
};
