/**
 * Represents a field extracted from a JSON schema
 * @typedef {Object} ExtractedField
 * @property {string} fieldName - Name of the field
 * @property {string|null} legacyModel - Associated x-legacy-model value
 * @property {string|null} settingKey - Associated x-setting-key value
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
            
            // Extract field information
            fields.push({
                fieldName: fullPath,
                legacyModel: fieldLegacyModel,
                settingKey: fieldSchema['x-setting-key'] || null
            });

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

module.exports = {
    extractFields,
    processSchema
};
