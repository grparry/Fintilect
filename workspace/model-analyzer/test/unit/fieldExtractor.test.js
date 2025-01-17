const { extractFields, processSchema } = require('../../src/fieldExtractor');

describe('fieldExtractor', () => {
    describe('extractFields', () => {
        it('should extract basic field information', () => {
            const schema = {
                type: 'object',
                'x-legacy-model': 'RootModel',
                properties: {
                    field1: {
                        type: 'string',
                        'x-setting-key': 'setting1'
                    }
                }
            };

            const fields = extractFields(schema, schema['x-legacy-model']);
            expect(fields).toHaveLength(1);
            expect(fields[0]).toEqual({
                fieldName: 'field1',
                legacyModel: 'RootModel',
                settingKey: 'setting1'
            });
        });

        it('should handle nested objects', () => {
            const schema = {
                type: 'object',
                'x-legacy-model': 'RootModel',
                properties: {
                    nested: {
                        type: 'object',
                        properties: {
                            subField: {
                                type: 'string',
                                'x-setting-key': 'nested.setting'
                            }
                        }
                    }
                }
            };

            const fields = extractFields(schema, schema['x-legacy-model']);
            expect(fields).toHaveLength(2);
            expect(fields[1]).toEqual({
                fieldName: 'nested.subField',
                legacyModel: 'RootModel',
                settingKey: 'nested.setting'
            });
        });

        it('should handle arrays', () => {
            const schema = {
                type: 'object',
                'x-legacy-model': 'RootModel',
                properties: {
                    items: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                arrayField: {
                                    type: 'string',
                                    'x-setting-key': 'array.setting'
                                }
                            }
                        }
                    }
                }
            };

            const fields = extractFields(schema, schema['x-legacy-model']);
            expect(fields).toHaveLength(2);
            expect(fields[1]).toEqual({
                fieldName: 'items[].arrayField',
                legacyModel: 'RootModel',
                settingKey: 'array.setting'
            });
        });

        it('should handle field-level legacy model override', () => {
            const schema = {
                type: 'object',
                'x-legacy-model': 'RootModel',
                properties: {
                    field1: {
                        type: 'string',
                        'x-legacy-model': 'OverrideModel',
                        'x-setting-key': 'setting1'
                    }
                }
            };

            const fields = extractFields(schema, schema['x-legacy-model']);
            expect(fields).toHaveLength(1);
            expect(fields[0]).toEqual({
                fieldName: 'field1',
                legacyModel: 'OverrideModel',
                settingKey: 'setting1'
            });
        });
    });

    describe('processSchema', () => {
        it('should process valid schema successfully', () => {
            const schema = {
                type: 'object',
                'x-legacy-model': 'TestModel',
                properties: {
                    field1: {
                        type: 'string',
                        'x-setting-key': 'test.setting'
                    }
                }
            };

            const result = processSchema(schema, 'test.json');
            expect(result.success).toBe(true);
            expect(result.fields).toHaveLength(1);
            expect(result.error).toBeNull();
        });

        it('should handle errors gracefully', () => {
            const result = processSchema(null, 'test.json');
            expect(result.fields).toHaveLength(0);
            expect(result.success).toBe(false);
            expect(result.error).toBeDefined();
        });
    });
});
