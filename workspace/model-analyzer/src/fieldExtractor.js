/**
 * Represents a field extracted from a JSON schema
 * @typedef {Object} ExtractedField
 * @property {string} fieldName - Name of the field
 * @property {string|null} legacyModel - Associated x-legacy-model value
 * @property {string|null} settingKey - Associated x-setting-key value
 * @property {string|null} error - Error message if field extraction failed
 */

/**
 * Extracts field information from a schema object
 * @param {Object} schema - The JSON schema object
 * @param {string|null} parentLegacyModel - Legacy model from parent context
 * @param {string} [parentPath=''] - Path to current field for nested objects
 * @returns {Array<ExtractedField>} Array of extracted field information
 */
function extractFields(schema, parentLegacyModel, parentPath = '') {
    const fields = [];

    if (!schema || typeof schema !== 'object') {
        return fields;
    }

    // Handle properties in an object
    if (schema.properties) {
        Object.entries(schema.properties).forEach(([fieldName, fieldSchema]) => {
            const fullPath = parentPath ? `${parentPath}.${fieldName}` : fieldName;
            
            // Get field-specific legacy model or use parent's
            const fieldLegacyModel = fieldSchema['x-legacy-model'] || parentLegacyModel;
            
            try {
                // Extract field information
                fields.push({
                    fieldName: fullPath,
                    legacyModel: fieldLegacyModel,
                    settingKey: fieldSchema['x-setting-key'] || null,
                    error: null
                });
            } catch (error) {
                fields.push({
                    fieldName: fullPath,
                    legacyModel: fieldLegacyModel,
                    settingKey: null,
                    error: error.message
                });
            }

            // Recursively process nested objects
            if (fieldSchema.type === 'object' && fieldSchema.properties) {
                fields.push(...extractFields(fieldSchema, fieldLegacyModel, fullPath));
            }

            // Handle array items
            if (fieldSchema.type === 'array' && fieldSchema.items) {
                fields.push(...extractFields(fieldSchema.items, fieldLegacyModel, `${fullPath}[]`));
            }
        });
    }

    // Handle array items at root level
    if (schema.type === 'array' && schema.items) {
        fields.push(...extractFields(schema.items, parentLegacyModel, '[]'));
    }

    return fields;
}

/**
 * Processes a schema and extracts all field information
 * @param {Object} schema - The JSON schema to process
 * @param {string} filePath - Path to the schema file (for error reporting)
 * @returns {Object} Object containing extracted fields and any errors
 */
function processSchema(schema, filePath) {
    try {
        const rootLegacyModel = schema['x-legacy-model'] || null;
        const fields = extractFields(schema, rootLegacyModel);

        return {
            filePath,
            fields,
            success: true,
            error: null
        };
    } catch (error) {
        return {
            filePath,
            fields: [],
            success: false,
            error: `Failed to extract fields from ${filePath}: ${error.message}`
        };
    }
}

/**
 * Writes field data to an output file
 * @param {Array} fieldData - Array of field data objects
 * @param {string} outputDir - Output directory path
 */
async function writeFieldData(fieldData, outputDir) {
    const outputFile = path.join(outputDir, 'model_field_data.md');
    let content = '| Source Model | Field Name | Legacy Model | Setting Key | Error |\n';
    content += '|--------------|------------|--------------|-------------|-------|\n';

    for (const field of fieldData) {
        content += `| ${field.filePath} | ${field.fieldName} | ${field.legacyModel || ''} | ${field.settingKey || ''} | ${field.error || ''} |\n`;
    }

    await fs.writeFile(outputFile, content);
}

/**
 * Writes error data to an output file
 * @param {Array} errorData - Array of error data objects
 * @param {string} outputDir - Output directory path
 */
async function writeErrorData(errorData, outputDir) {
    const outputFile = path.join(outputDir, 'model_file_errors.md');
    let content = '# Model File Processing Errors\n\n';
    content += '| File | Error |\n';
    content += '|------|-------|\n';

    for (const error of errorData) {
        content += `| ${error.filePath} | ${error.error} |\n`;
    }

    await fs.writeFile(outputFile, content);
}

/**
 * Processes schema files and extracts field information
 * @param {Array} schemaFiles - Array of schema file paths
 * @param {string} outputDir - Output directory path
 */
async function processSchemaFiles(schemaFiles, outputDir) {
    const fieldData = [];
    const errorData = [];

    for (const filePath of schemaFiles) {
        try {
            const schemaInfo = await require('./schemaParser').processSchemaFile(filePath);
            
            if (schemaInfo.isValid) {
                const fields = extractFields(schemaInfo.schema, schemaInfo.rootLegacyModel);
                fields.forEach(field => {
                    field.filePath = filePath;
                });
                fieldData.push(...fields);
            } else {
                errorData.push({
                    filePath,
                    error: schemaInfo.error
                });
            }
        } catch (error) {
            errorData.push({
                filePath,
                error: error.message
            });
        }
    }

    await fs.ensureDir(outputDir);
    await writeFieldData(fieldData, outputDir);
    await writeErrorData(errorData, outputDir);
}

module.exports = {
    extractFields,
    processSchema,
    processSchemaFiles
};
