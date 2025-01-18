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
        
        // Find the main schema - it's usually the first definition that's not referenced by others
        const mainSchema = findMainSchema(parsed);
        
        return resolveReferences(mainSchema, parsed);
    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error(`Invalid JSON syntax: ${error.message}`);
        }
        throw error;
    }
}

/**
 * Finds the main schema definition in a JSON schema file
 * @param {Object} schema - The schema object to analyze
 * @returns {Object} The main schema definition
 */
function findMainSchema(schema) {
    // Case 1: Schema is already a valid schema object
    if (schema.type === 'object' && schema.properties) {
        return schema;
    }

    // Case 2: Schema is wrapped in a root object
    if (typeof schema === 'object') {
        for (const key of Object.keys(schema)) {
            const value = schema[key];
            
            // Handle object type schemas
            if (value && value.type === 'object' && value.properties) {
                return value;
            }
            
            // Handle enum type schemas
            if (value && value.type === 'string' && value.enum) {
                // Convert enum schema to object schema format
                return {
                    type: 'object',
                    properties: {
                        value: value
                    }
                };
            }
        }
    }

    throw new Error('Unable to identify main schema. No type property or valid definition found.');
}

/**
 * Finds all $ref values in a schema
 * @param {Object} schema - Schema to search
 * @param {Array} refs - Array to collect refs into
 */
function findAllRefs(schema, refs) {
    if (!schema || typeof schema !== 'object') {
        return;
    }

    if (Array.isArray(schema)) {
        schema.forEach(item => findAllRefs(item, refs));
        return;
    }

    for (const [key, value] of Object.entries(schema)) {
        if (key === '$ref' && typeof value === 'string') {
            refs.push(value);
        } else if (typeof value === 'object') {
            findAllRefs(value, refs);
        }
    }
}

/**
 * Resolves JSON Schema references within a schema
 * @param {Object} schema - Schema to resolve references in
 * @param {Object} rootDoc - Root document containing all definitions
 * @param {Set} visited - Set of visited references to prevent infinite recursion
 * @returns {Object} Schema with resolved references
 */
function resolveReferences(schema, rootDoc, visited = new Set()) {
    if (!schema || typeof schema !== 'object') {
        return schema;
    }

    if (Array.isArray(schema)) {
        return schema.map(item => resolveReferences(item, rootDoc, visited));
    }

    const resolved = { ...schema };

    // Handle $ref
    if (schema.$ref) {
        const ref = schema.$ref;
        if (ref.startsWith('#/')) {
            // Prevent infinite recursion
            if (visited.has(ref)) {
                throw new Error(`Circular reference detected: ${Array.from(visited).join(' -> ')} -> ${ref}`);
            }
            visited.add(ref);

            const path = ref.substring(2).split('/');
            let target = rootDoc;
            for (const segment of path) {
                target = target[segment];
                if (!target) {
                    throw new Error(`Invalid reference '${ref}': path segment '${segment}' not found`);
                }
            }
            return resolveReferences(target, rootDoc, visited);
        }
        throw new Error(`External references not supported: ${ref}`);
    }

    // Recursively resolve references in all properties
    for (const [key, value] of Object.entries(resolved)) {
        if (typeof value === 'object') {
            try {
                resolved[key] = resolveReferences(value, rootDoc, new Set(visited));
            } catch (error) {
                throw new Error(`Error resolving references in '${key}': ${error.message}`);
            }
        }
    }

    return resolved;
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
            schema.hasOwnProperty('$schema') ||
            schema.hasOwnProperty('$ref') ||
            schema.hasOwnProperty('oneOf') ||
            schema.hasOwnProperty('allOf') ||
            schema.hasOwnProperty('anyOf')
        )
    );
}

/**
 * Extracts field information from a schema
 * @param {Object} schema - The schema to extract fields from
 * @param {string} prefix - The current field prefix for nested objects
 * @param {Object} legacyModel - The legacy model information
 * @returns {Array} Array of field information objects
 */
function extractFields(schema, prefix = '', legacyModel = null) {
    const fields = [];
    
    // If schema is a string enum type, treat it as a single field
    if (schema.type === 'string' && schema.enum) {
        fields.push({
            fieldName: prefix || 'value',
            legacyModel: legacyModel,
            settingKey: null
        });
        return fields;
    }

    // Handle regular object schemas
    if (schema.properties) {
        for (const [key, value] of Object.entries(schema.properties)) {
            const fieldPrefix = prefix ? `${prefix}.${key}` : key;
            
            if (value.type === 'object' && value.properties) {
                // Recursively process nested objects
                fields.push(...extractFields(value, fieldPrefix, value['x-legacy-model'] || legacyModel));
            } else {
                fields.push({
                    fieldName: fieldPrefix,
                    legacyModel: value['x-legacy-model'] || legacyModel,
                    settingKey: value['x-setting-key'] || null
                });
            }
        }
    }
    
    return fields;
}

/**
 * Processes a schema file and extracts relevant information
 * @param {string} filePath - Path to the schema file
 * @returns {Object} Object containing schema information and validation status
 */
async function processSchemaFile(filePath) {
    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        const schema = JSON.parse(fileContent);

        const mainSchema = findMainSchema(schema);

        // Extract root level legacy model if present
        const rootLegacyModel = mainSchema['x-legacy-model'] || null;

        return {
            isValid: true,
            schema: mainSchema,
            rootLegacyModel,
            filePath,
            error: null
        };
    } catch (error) {
        return {
            isValid: false,
            error: `Failed to process schema file: ${error.message}`,
            filePath
        };
    }
}

module.exports = {
    readJsonSchema,
    isJsonSchema,
    processSchemaFile
};
