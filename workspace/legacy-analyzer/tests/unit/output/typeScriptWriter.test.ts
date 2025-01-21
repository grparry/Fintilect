import { describe, beforeEach, afterEach, it, expect } from '@jest/globals';
import { TypeScriptWriter } from '../../../src/output/typeScriptWriter';
import { ParsedClass, ParsedField, ParsedClassType, ParsedAttributeArgument } from '../../../src/parser/csharpParser';
import { FileService } from '../../../src/services/fileService';
import path from 'path';

interface ISettingsGroup {
    groupName: string;
}

describe('TypeScriptWriter', () => {
    let writer: TypeScriptWriter;
    let fileService: FileService;
    const testOutputDir = path.join(__dirname, 'test-output');

    beforeEach(() => {
        fileService = new FileService(testOutputDir);
        writer = new TypeScriptWriter(fileService, testOutputDir, 'test.ts');
    });

    describe('JSON Schema Conversion', () => {
        it('should generate interface from JSON example', () => {
            const jsonExample = `{
                "name": "John",
                "age": 30,
                "isActive": true,
                "roles": ["admin", "user"]
            }`;
            const result = writer['generateJsonInterface'](jsonExample);
            expect(result).toContain('export interface Root {');
            expect(result).toContain('name: string;');
            expect(result).toContain('age: number;');
            expect(result).toContain('isActive: boolean;');
            expect(result).toContain('roles: string[];');
            expect(result).toContain('}');
        });

        it('should handle empty or invalid JSON', () => {
            const emptyJson = '{}';
            const result = writer['generateJsonInterface'](emptyJson);
            expect(result).toBe('export interface Root object');

            const invalidJson = 'invalid';
            const invalidResult = writer['generateJsonInterface'](invalidJson);
            expect(invalidResult).toBe('export interface Root { [key: string]: any }');
        });
    });

    describe('JSON Helper Class Generation', () => {
        it('should generate helper class for JSON property', () => {
            const field: ParsedField = {
                name: 'filters',
                type: 'string',
                documentation: '```json\n{"type": "filter", "enabled": true}\n```',
                attributes: [],
                isNullable: false,
                isReadOnly: false,
                isPublic: true,
                validationRules: []
            };
            const result = writer['generateJsonHelperClass'](field);
            expect(result).toContain('export interface filtersConfig {');
            expect(result).toContain('type: string;');
            expect(result).toContain('enabled: boolean;');
            expect(result).toContain('}');
        });

        it('should handle missing JSON example', () => {
            const field: ParsedField = {
                name: 'filters',
                type: 'string',
                documentation: 'No JSON example here',
                attributes: [],
                isNullable: false,
                isReadOnly: false,
                isPublic: true,
                validationRules: []
            };
            const result = writer['generateJsonHelperClass'](field);
            expect(result).toBe('');
        });
    });

    describe('Settings Group Generation', () => {
        it('should generate settings group class', () => {
            const classInfo: ParsedClass = {
                name: 'TestServiceSettings',
                fields: [
                    {
                        name: 'Enabled',
                        type: 'bool',
                        attributes: [{ name: 'SettingKey', arguments: [{ value: '"Features.Test.Enabled"' }] }],
                        documentation: '',
                        isNullable: false,
                        isReadOnly: false,
                        isPublic: true,
                        validationRules: []
                    },
                    {
                        name: 'ShowInstructions',
                        type: 'bool',
                        attributes: [],
                        documentation: '',
                        isNullable: false,
                        isReadOnly: false,
                        isPublic: true,
                        validationRules: []
                    }
                ],
                type: 'class' as ParsedClassType,
                documentation: '',
                attributes: [],
                namespace: '',
                enums: []
            };
            const result = writer['generateSettingsGroup'](classInfo);
            expect(result).toContain('export class TestServiceSettings implements ISettingsGroup {');
            expect(result).toContain("groupName: 'TestServiceSettings'");
            expect(result).toContain('private _enabled: boolean;');
            expect(result).toContain('private _showInstructions: boolean;');
        });

        it('should handle empty class', () => {
            const classInfo: ParsedClass = {
                name: 'EmptySettings',
                fields: [],
                type: 'class' as ParsedClassType,
                documentation: '',
                attributes: [],
                namespace: '',
                enums: []
            };
            const result = writer['generateSettingsGroup'](classInfo);
            expect(result).toContain('export class EmptySettings implements ISettingsGroup {');
            expect(result).toContain("groupName: 'EmptySettings'");
        });
    });

    describe('JSON Schema Edge Cases', () => {
        it('should handle complex nested JSON structures', () => {
            const complexJson = `{
                "level1": {
                    "level2": {
                        "level3": {
                            "value": 42,
                            "array": [1, 2, 3]
                        }
                    }
                }
            }`;
            const result = writer['generateJsonInterface'](complexJson);
            expect(result).toContain('export interface Root {');
            expect(result).toContain('level1: {');
            expect(result).toContain('level2: {');
            expect(result).toContain('level3: {');
            expect(result).toContain('value: number;');
            expect(result).toContain('array: number[];');
        });

        it('should handle arrays of objects', () => {
            const arrayJson = `{
                "users": [
                    {
                        "id": 1,
                        "name": "John",
                        "roles": ["admin", "user"]
                    },
                    {
                        "id": 2,
                        "name": "Jane",
                        "roles": ["user"]
                    }
                ]
            }`;
            const result = writer['generateJsonInterface'](arrayJson);
            expect(result).toContain('export interface Root {');
            expect(result).toContain('users: {');
            expect(result).toContain('id: number;');
            expect(result).toContain('name: string;');
            expect(result).toContain('roles: string[];');
            expect(result).toContain('}[];');
        });

        it('should handle mixed type arrays', () => {
            const mixedArrayJson = `{
                "mixedArray": [1, "string", true, null, {"key": "value"}],
                "mixedObjects": [
                    {"type": "user", "id": 1},
                    {"type": "group", "name": "admins"}
                ]
            }`;
            const result = writer['generateJsonInterface'](mixedArrayJson);
            expect(result).toContain('export interface Root {');
            expect(result).toContain('mixedArray: any[];');
            expect(result).toContain('mixedObjects: {');
            expect(result).toContain('[key: string]: any;');
            expect(result).toContain('}[];');
        });

        it('should handle null values in JSON', () => {
            const nullJson = `{
                "nullableString": null,
                "nullableObject": null,
                "nullableArray": null,
                "mixedNull": ["value", null, 42]
            }`;
            const result = writer['generateJsonInterface'](nullJson);
            expect(result).toContain('export interface Root {');
            expect(result).toContain('nullableString: null | string;');
            expect(result).toContain('nullableObject: null | object;');
            expect(result).toContain('nullableArray: null | any[];');
            expect(result).toContain('mixedNull: (string | number | null)[];');
        });

        it('should handle empty objects and arrays', () => {
            const emptyJson = `{
                "emptyObject": {},
                "emptyArray": [],
                "emptyString": "",
                "zero": 0,
                "false": false
            }`;
            const result = writer['generateJsonInterface'](emptyJson);
            expect(result).toContain('export interface Root {');
            expect(result).toContain('emptyObject: object;');
            expect(result).toContain('emptyArray: any[];');
            expect(result).toContain('emptyString: string;');
            expect(result).toContain('zero: number;');
            expect(result).toContain('false: boolean;');
        });

        it('should handle special characters in property names', () => {
            const specialJson = `{
                "@type": "special",
                "property-name": "value",
                "space name": true,
                "123numeric": 42
            }`;
            const result = writer['generateJsonInterface'](specialJson);
            expect(result).toContain('export interface Root {');
            expect(result).toContain('["@type"]: string;');
            expect(result).toContain('["property-name"]: string;');
            expect(result).toContain('["space name"]: boolean;');
            expect(result).toContain('["123numeric"]: number;');
        });
    });

    describe('Type Conversion', () => {
        describe('Basic C# Types', () => {
            it('should convert primitive types', () => {
                expect(writer['mapCSharpTypeToTypeScript']('string')).toBe('string');
                expect(writer['mapCSharpTypeToTypeScript']('int')).toBe('number');
                expect(writer['mapCSharpTypeToTypeScript']('bool')).toBe('boolean');
                expect(writer['mapCSharpTypeToTypeScript']('object')).toBe('any');
            });

            it('should handle nullable value types', () => {
                expect(writer['mapCSharpTypeToTypeScript']('int?')).toBe('number | null');
                expect(writer['mapCSharpTypeToTypeScript']('bool?')).toBe('boolean | null');
                expect(writer['mapCSharpTypeToTypeScript']('DateTime?')).toBe('Date | null');
            });

            it('should handle nullable reference types', () => {
                expect(writer['mapCSharpTypeToTypeScript']('string?')).toBe('string | null');
                expect(writer['mapCSharpTypeToTypeScript']('object?')).toBe('any | null');
            });
        });

        describe('Collection Types', () => {
            it('should convert array types', () => {
                expect(writer['mapCSharpTypeToTypeScript']('string[]')).toBe('string[]');
                expect(writer['mapCSharpTypeToTypeScript']('int[]')).toBe('number[]');
                expect(writer['mapCSharpTypeToTypeScript']('bool[]')).toBe('boolean[]');
            });

            it('should handle generic collections', () => {
                expect(writer['mapCSharpTypeToTypeScript']('List<string>')).toBe('string[]');
                expect(writer['mapCSharpTypeToTypeScript']('IEnumerable<int>')).toBe('number[]');
                expect(writer['mapCSharpTypeToTypeScript']('ICollection<bool>')).toBe('boolean[]');
            });

            it('should convert dictionary types', () => {
                expect(writer['mapCSharpTypeToTypeScript']('Dictionary<string, int>')).toBe('{ [key: string]: number }');
                expect(writer['mapCSharpTypeToTypeScript']('IDictionary<string, bool>')).toBe('{ [key: string]: boolean }');
            });

            it('should handle nested collections', () => {
                expect(writer['mapCSharpTypeToTypeScript']('List<List<string>>')).toBe('string[][]');
                expect(writer['mapCSharpTypeToTypeScript']('Dictionary<string, List<int>>')).toBe('{ [key: string]: number[] }');
            });
        });

        describe('Custom Types', () => {
            beforeEach(() => {
                // Register some custom types
                writer['registerType']('UserSettings', 'Test.Models');
                writer['registerType']('Configuration', 'Test.Models');
                writer['registerType']('ApiResponse', 'Test.Api');
            });

            it('should handle custom types', () => {
                expect(writer['mapCSharpTypeToTypeScript']('UserSettings')).toBe('UserSettings');
                expect(writer['mapCSharpTypeToTypeScript']('Configuration')).toBe('Configuration');
            });

            it('should handle generic custom types', () => {
                expect(writer['mapCSharpTypeToTypeScript']('ApiResponse<UserSettings>')).toBe('ApiResponse<UserSettings>');
                expect(writer['mapCSharpTypeToTypeScript']('List<Configuration>')).toBe('Configuration[]');
            });

            it('should handle unregistered types', () => {
                expect(writer['mapCSharpTypeToTypeScript']('UnknownType')).toBe('UnknownType');
                expect(writer['mapCSharpTypeToTypeScript']('List<UnknownType>')).toBe('UnknownType[]');
            });
        });
    });
});
