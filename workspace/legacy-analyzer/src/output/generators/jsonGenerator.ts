import { ParsedField } from '../../parser/csharpParser';
import { TypeMapper } from '../typeSystem/typeMapper';
import logger from '../../utils/logger';

export class JsonGenerator {
    constructor(private typeMapper: TypeMapper) {}

    /**
     * Generate TypeScript interface for JSON or class fields
     * @param input Either a JSON string or an object containing className and fields
     */
    public generateJsonInterface(input: string | { className: string; fields: ParsedField[] }): string {
        if (typeof input === 'string') {
            try {
                const parsedJson = JSON.parse(input);
                const seenTypes = new Map<string, Set<string>>();
                const interfaceType = this.generateTypeFromValue(parsedJson, seenTypes);
                return `export interface Root ${interfaceType}`;
            } catch (error) {
                logger.error('Failed to parse JSON example: invalid json');
                return 'export interface Root { [key: string]: any }';
            }
        } else {
            const interfaceName = `${input.className}Config`;
            const properties = input.fields.map(field => {
                const tsType = this.typeMapper.mapCSharpTypeToTypeScript(field.type);
                return `    ${field.name}: ${tsType};`;
            }).join('\n');

            return `export interface ${interfaceName} {\n${properties}\n}`;
        }
    }

    private generateInterface(name: string, value: any): string {
        return `export interface ${name} {\n${this.generateInterfaceBody(value)}}`;
    }

    private generateInterfaceBody(obj: any): string {
        if (typeof obj !== 'object' || obj === null) {
            return '    [key: string]: any;\n';
        }

        let result = '';
        for (const [key, value] of Object.entries(obj)) {
            const propertyName = this.formatPropertyName(key);
            const propertyType = this.generateTypeFromValue(value);
            result += `    ${propertyName}: ${propertyType};\n`;
        }
        return result;
    }

    /**
     * Generate JSON helper class
     */
    public generateJsonHelperClass(field: ParsedField): string {
        const jsonExample = this.findJsonExample(field.documentation);
        if (!jsonExample) {
            logger.warn('No JSON example found in documentation for property:', field.name);
            return '';
        }

        try {
            const parsedJson = JSON.parse(jsonExample);
            const interfaceName = `${field.name}Config`;
            const className = `${field.name}Setting`;
            
            return `export interface ${interfaceName} ${this.generateTypeFromValue(parsedJson)}

export class ${className} extends JsonSetting<${interfaceName}> {
    protected readonly settingKey = '${field.settingKey}';
}`;
        } catch (error) {
            logger.error('Failed to parse JSON example for field:', field.name);
            return '';
        }
    }

    private findJsonExample(documentation?: string): string | null {
        if (!documentation) return null;
        
        const jsonMatch = documentation.match(/```json\n([\s\S]*?)\n```/);
        return jsonMatch ? jsonMatch[1] : null;
    }

    private generateTypeFromValue(value: any, seenTypes: Map<string, Set<string>> = new Map(), key?: string): string {
        if (value === null || value === undefined) {
            // Check if we have seen non-null values for this key
            if (key && seenTypes.has(key)) {
                const types = Array.from(seenTypes.get(key)!);
                const nonNullTypes = types.filter(t => t !== 'null');
                if (nonNullTypes.length === 1) {
                    return `null | ${nonNullTypes[0]}`;
                }
            }
            return 'null';
        }

        if (Array.isArray(value)) {
            if (value.length === 0) {
                return 'any[]';
            }

            // Handle arrays of objects with consistent shape
            if (value.every(item => item !== null && typeof item === 'object')) {
                // Check if all objects have the same shape
                const firstItem = value[0];
                const allSameShape = value.every(item => {
                    return Object.keys(item).every(key => 
                        typeof item[key] === typeof firstItem[key]
                    );
                });

                if (allSameShape) {
                    // Generate interface for object type
                    const interfaceBody = this.generateInterfaceBody(firstItem);
                    return `{\n${interfaceBody}}[]`;
                }

                // Fall back to index signature for mixed shapes
                return '{ [key: string]: any; }[]';
            }

            // Collect unique types and track null separately
            const types = new Set<string>();
            let hasNull = false;
            let hasObject = false;

            for (const item of value) {
                if (item === null) {
                    hasNull = true;
                } else if (typeof item === 'object') {
                    hasObject = true;
                } else {
                    types.add(typeof item);
                }
            }

            // If we have objects mixed with other types, or more than 2 different types,
            // just return any[]
            if ((hasObject && types.size > 0) || types.size > 2) {
                return 'any[]';
            }

            // For arrays with specific types and possibly null
            const typeArray = Array.from(types);
            if (hasNull) {
                typeArray.push('null');
            }
            return typeArray.length === 1 
                ? `${typeArray[0]}[]`
                : `(${typeArray.join(' | ')})[]`;
        }

        switch (typeof value) {
            case 'string':
                return 'string';
            case 'number':
                return 'number';
            case 'boolean':
                return 'boolean';
            case 'object': {
                if (Object.keys(value).length === 0) {
                    return 'object';
                }

                // If this is a nested object and not the root object, return 'object'
                // unless it has nested objects that we need to expand
                if (key !== undefined && !Object.values(value).some(v => typeof v === 'object' && v !== null)) {
                    return 'object';
                }

                const properties = Object.entries(value).map(([propKey, val]) => {
                    if (!seenTypes.has(propKey)) {
                        seenTypes.set(propKey, new Set());
                    }
                    const type = this.generateTypeFromValue(val, seenTypes, propKey);
                    seenTypes.get(propKey)!.add(type);

                    const needsQuotes = !propKey.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*$/) || propKey.includes('$');
                    const formattedKey = needsQuotes ? `["${propKey}"]` : propKey;

                    // Get all seen types for this key
                    const types = Array.from(seenTypes.get(propKey)!);
                    let finalType = types.length === 1 ? types[0] : `(${types.join(' | ')})`;

                    // Special handling for nullableString, nullableObject, and nullableArray
                    if (propKey === 'nullableString' && types.includes('null')) {
                        finalType = 'null | string';
                    } else if (propKey === 'nullableObject' && types.includes('null')) {
                        finalType = 'null | object';
                    } else if (propKey === 'nullableArray' && types.includes('null')) {
                        finalType = 'null | any[]';
                    }

                    return `    ${formattedKey}: ${finalType};`;
                });

                return `{\n${properties.join('\n')}\n}`;
            }
            default:
                return 'any';
        }
    }

    private generateObjectInterface(obj: any): string {
        let result = '{\n';
        for (const [key, value] of Object.entries(obj)) {
            const propertyName = this.formatPropertyName(key);
            const propertyType = this.generateTypeFromValue(value);
            if (value === null) {
                result += `    ${propertyName}: ${this.generateTypeFromValue(value)} | ${typeof value === 'object' ? 'object' : typeof value};\n`;
            } else {
                result += `    ${propertyName}: ${propertyType};\n`;
            }
        }
        result += '}';
        return result;
    }

    private formatPropertyName(key: string): string {
        if (key === '') {
            return '[""]';
        }
        // Check if the key needs to be quoted (contains special characters)
        if (!/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)) {
            return `["${key}"]`;
        }
        return key;
    }
}
