const path = require('path');
const fs = require('fs-extra');
const {
    readJsonSchema,
    isJsonSchema,
    extractRootLegacyModel,
    processSchemaFile
} = require('../../src/schemaParser');

describe('schemaParser', () => {
    const testDir = path.join(__dirname, '../testData');
    const validSchemaPath = path.join(testDir, 'test.json');
    const invalidSchemaPath = path.join(testDir, 'invalid.json');

    beforeAll(async () => {
        // Create invalid JSON file for testing
        await fs.writeFile(invalidSchemaPath, '{ invalid json }');
    });

    afterAll(async () => {
        // Cleanup test files
        await fs.remove(invalidSchemaPath);
    });

    describe('readJsonSchema', () => {
        it('should read and parse valid JSON file', async () => {
            const schema = await readJsonSchema(validSchemaPath);
            expect(schema).toBeDefined();
            expect(typeof schema).toBe('object');
        });

        it('should throw error for invalid JSON', async () => {
            await expect(readJsonSchema(invalidSchemaPath))
                .rejects.toThrow('Invalid JSON');
        });

        it('should throw error for non-existent file', async () => {
            await expect(readJsonSchema('nonexistent.json'))
                .rejects.toThrow('Failed to read file');
        });
    });

    describe('isJsonSchema', () => {
        it('should return true for valid schema', () => {
            const schema = {
                type: 'object',
                properties: {}
            };
            expect(isJsonSchema(schema)).toBe(true);
        });

        it('should return false for non-schema object', () => {
            const nonSchema = {
                foo: 'bar'
            };
            expect(isJsonSchema(nonSchema)).toBe(false);
        });

        it('should return false for null', () => {
            expect(isJsonSchema(null)).toBe(false);
        });
    });

    describe('extractRootLegacyModel', () => {
        it('should extract x-legacy-model value', () => {
            const schema = {
                'x-legacy-model': 'TestModel'
            };
            expect(extractRootLegacyModel(schema)).toBe('TestModel');
        });

        it('should return null when x-legacy-model is not present', () => {
            const schema = {};
            expect(extractRootLegacyModel(schema)).toBeNull();
        });
    });

    describe('processSchemaFile', () => {
        it('should process valid schema file', async () => {
            const result = await processSchemaFile(validSchemaPath);
            expect(result.isValid).toBe(true);
            expect(result.rootLegacyModel).toBe('TestModel');
        });

        it('should handle invalid JSON file', async () => {
            const result = await processSchemaFile(invalidSchemaPath);
            expect(result.isValid).toBe(false);
            expect(result.error).toBeDefined();
        });

        it('should handle non-existent file', async () => {
            const result = await processSchemaFile('nonexistent.json');
            expect(result.isValid).toBe(false);
            expect(result.error).toBeDefined();
        });
    });
});
