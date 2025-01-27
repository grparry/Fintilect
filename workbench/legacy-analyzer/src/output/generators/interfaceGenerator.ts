import { ParsedField, ParsedEnum, ParsedEnumValue, ParsedClass } from '@legacy-analyzer/../parser/types';
import { TypeMapper } from '@legacy-analyzer/typeSystem/typeMapper';
import logger from '@legacy-analyzer/../utils/logger';

export class InterfaceGenerator {
    constructor(private typeMapper: TypeMapper) {}

    /**
     * Generate TypeScript interface definition
     */
    public generateInterface(className: string, properties: ParsedField[]): string {
        let interfaceDefinition = `export interface ${className} {\n`;
        
        for (const property of properties) {
            interfaceDefinition += `    ${this.generateField(property)}\n`;
        }
        
        interfaceDefinition += '}\n';
        return interfaceDefinition;
    }

    private generateField(field: ParsedField): string {
        const type = TypeMapper.mapCSharpTypeToTypeScript(field.type);
        const nullableSuffix = field.isNullable ? '?' : '';
        return `${field.name}${nullableSuffix}: ${type};`;
    }

    /**
     * Generate TypeScript enum definition
     */
    public generateEnumType(enumDef: ParsedClass | ParsedEnum): string {
        let enumDefinition = `export enum ${enumDef.name} {\n`;
        
        if ('values' in enumDef && enumDef.values) {
            enumDef.values.forEach((enumValue: ParsedEnumValue) => {
                enumDefinition += `    ${enumValue.name}`;
                if (enumValue.value !== undefined) {
                    enumDefinition += ` = ${enumValue.value}`;
                }
                enumDefinition += ',\n';
            });
        }
        
        enumDefinition += '}\n';
        return enumDefinition;
    }

    /**
     * Generate TypeScript type from a value
     */
    public generateTypeFromValue(value: any, indent: string = '', name?: string): string {
        if (value === null || value === undefined) {
            return 'any';
        }

        switch (typeof value) {
            case 'string':
                return 'string';
            case 'number':
                return 'number';
            case 'boolean':
                return 'boolean';
            case 'object':
                if (Array.isArray(value)) {
                    if (value.length === 0) {
                        return 'any[]';
                    }
                    const elementType = this.generateTypeFromValue(value[0]);
                    return `${elementType}[]`;
                }
                return this.generateObjectInterface(value, indent);
            default:
                return 'any';
        }
    }

    private generateObjectInterface(obj: any, indent: string = ''): string {
        let result = '{\n';
        for (const [key, value] of Object.entries(obj)) {
            const propertyName = this.formatPropertyName(key);
            const propertyType = this.generateTypeFromValue(value, indent + '    ');
            result += `${indent}    ${propertyName}: ${propertyType};\n`;
        }
        result += `${indent}}`;
        return result;
    }

    private formatPropertyName(key: string): string {
        if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)) {
            return key;
        }
        return `'${key}'`;
    }
}
