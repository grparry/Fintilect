import { ParsedClass, ParsedField, ParsedAttribute } from '../../parser/types';
import logger from '../../utils/logger';
import { TypeMapper } from '../typeSystem/typeMapper'; 

export class SettingsGenerator {
    private typeMapper: TypeMapper;

    constructor() {
        this.typeMapper = new TypeMapper();
    }

    private cleanTypeName(type: string): string {
        return type.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    }

    private formatLabel(label: string): string {
        // Convert camelCase to Title Case with spaces
        const withSpaces = label
            .replace(/([A-Z])/g, ' $1')  // Add space before capital letters
            .replace(/^./, str => str.toUpperCase())  // Capitalize first letter
            .trim();  // Remove leading/trailing spaces

        // Handle numbers at the end of the label
        const parts = withSpaces.split(/(\d+)/).filter(Boolean);
        return parts.map((part, i) => {
            if (/^\d+$/.test(part)) {
                return ` ${part}`;  // Add space before numbers
            }
            return i === 0 ? part : part.toLowerCase();
        }).join('');
    }

    private sanitizeDescription(description: string): string {
        return description.replace(/"/g, '\\"');
    }

    private formatDefaultValue(defaultValue: any, type: string): string {
        if (type === 'string') {
            return `'${defaultValue}'`;
        } else if (type === 'number' || type === 'int' || type === 'long' || type === 'double' || type === 'float' || type === 'decimal') {
            return defaultValue.toString();
        } else if (type === 'boolean') {
            return defaultValue.toString().toLowerCase();
        } else if (type === 'DateTime' || type === 'DateTimeOffset') {
            return `new Date('${defaultValue}')`;
        } else if (type === 'TimeSpan') {
            return `'${defaultValue}'`;
        } else if (type === 'Guid') {
            return `'${defaultValue}'`;
        } else if (type === 'Uri') {
            return `'${defaultValue}'`;
        } else if (type === 'Array' || type === 'List' || type === 'Dictionary' || type === 'object' || type === 'dynamic') {
            return 'null';
        } else {
            return 'null';
        }
    }

    private generateValidationRules(validationRules: any[]): string {
        return JSON.stringify(validationRules);
    }

    /**
     * Generate settings group class
     */
    public generateSettingsGroup(classInfo: ParsedClass): string {
        let result = `export class ${classInfo.name} implements ISettingsGroup {\n`;
        
        // Add metadata with settings property
        result += this.generateSettingsMetadata(classInfo);
        result += '\n';

        // Add setting key constants
        if (classInfo.fields) {
            for (const field of classInfo.fields) {
                if (field.settingKey) {
                    const settingName = field.name.charAt(0).toLowerCase() + field.name.slice(1);
                    result += `    static readonly ${settingName}Key = '${classInfo.name}.${field.name}';\n`;
                }
            }
            result += '\n';
        }

        // Add fields
        if (classInfo.fields) {
            const jsonFields = classInfo.fields.filter(f => f.documentation?.includes('```json'));
            if (jsonFields.length > 0) {
                const jsonSettingClass = this.generateJsonSettingClass(classInfo);
                result += `${jsonSettingClass}
    private readonly _jsonSettings = new JsonSettingsManager();
    get jsonSettings(): ${classInfo.name}JsonConfig {
        return this._jsonSettings.value;
    }
    set jsonSettings(value: ${classInfo.name}JsonConfig) {
        this._jsonSettings.value = value;
    }\n\n`;
            }

            for (const field of classInfo.fields) {
                if (!field.documentation?.includes('```json')) {
                    const settingName = field.name.charAt(0).toLowerCase() + field.name.slice(1);
                    const cleanType = this.cleanTypeName(field.type);
                    const tsType = TypeMapper.mapCSharpTypeToTypeScript(cleanType);
                    
                    if (field.documentation?.includes('```json')) {
                        const configType = `${settingName}Config`;
                        const jsonSettingClass = this.generateJsonSettingClass(field);
                        result += `${jsonSettingClass}
    private readonly _${settingName} = new ${settingName}Setting();
    get ${settingName}(): ${configType} {
        return this._${settingName}.value;
    }
    set ${settingName}(value: ${configType}) {
        this._${settingName}.value = value;
    }\n\n`;
                    } else {
                        result += `    private _${settingName}: ${tsType};\n`;
                        result += `    get ${settingName}(): ${tsType} {\n`;
                        result += `        return this._${settingName};\n`;
                        result += '    }\n\n';
                        result += `    set ${settingName}(value: ${tsType}) {\n`;
                        result += `        this._${settingName} = value;\n`;
                        result += '    }\n\n';
                    }
                }
            }
        }
        
        // Add constructor
        result += '    constructor() {}\n\n';
        
        // Add toSettings method
        result += this.generateToSettings(classInfo);
        
        // Add fromSettings method
        result += this.generateFromSettings(classInfo);

        result += '}\n';
        
        return result;
    }

    public generateSettingsClass(parsedClass: ParsedClass): string {
        const className = parsedClass.name;
        const configName = `${className}Config`;
        const fields = parsedClass.fields || [];
        
        // Generate interface
        let output = `import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';\n\n`;
        output += `export interface ${configName} {\n`;
        fields.forEach(field => {
            const tsType = this.typeMapper.mapType(field.type);
            output += `    ${field.name}: ${tsType};\n`;
        });
        output += `}\n\n`;

        // Generate class
        output += `export class ${className} implements ISettingsGroup {\n`;
        
        // Add metadata
        output += `    static readonly metadata: ISettingsMetadata = {\n`;
        output += `        groupName: '${className}',\n`;
        output += `        settings: {\n`;
        fields.forEach(field => {
            const tsType = this.typeMapper.mapType(field.type);
            output += `            ${field.name}: {\n`;
            output += `                key: '${className}.${field.name}',\n`;
            output += `                type: '${this.getSettingType(tsType)}',\n`;
            output += `                required: ${!field.isNullable}\n`;
            output += `            },\n`;
        });
        output += `        }\n`;
        output += `    };\n\n`;

        // Add private fields and getters/setters
        fields.forEach(field => {
            const tsType = this.typeMapper.mapType(field.type);
            output += `\n            private _${field.name.charAt(0).toLowerCase() + field.name.slice(1)}: ${tsType};\n`;
            output += `            get ${field.name.charAt(0).toLowerCase() + field.name.slice(1)}(): ${tsType} {\n`;
            output += `                return this._${field.name.charAt(0).toLowerCase() + field.name.slice(1)};\n`;
            output += `            }\n`;
            output += `            set ${field.name.charAt(0).toLowerCase() + field.name.slice(1)}(value: ${tsType}) {\n`;
            output += `                this._${field.name.charAt(0).toLowerCase() + field.name.slice(1)} = value;\n`;
            output += `            }\n`;
        });

        // Add constructor with default values
        output += `\n\n    constructor() {\n`;
        fields.forEach(field => {
            const settingName = field.name.charAt(0).toLowerCase() + field.name.slice(1);
            const defaultValue = this.getDefaultValueForType(field.type);
            output += `        this._${settingName} = ${defaultValue};\n`;
        });
        output += `    }\n\n`;

        // Add fromSettings and toSettings methods
        output += this.generateFromSettings(parsedClass);
        output += this.generateToSettings(parsedClass);

        output += `}\n`;
        return output;
    }

    private generateSettingsMetadata(parsedClass: ParsedClass): string {
        const settings: Record<string, { key: string; type: string; required: boolean }> = {};
        
        parsedClass.fields.forEach(field => {
            const key = `${parsedClass.name}.${field.name}`;
            settings[field.name] = {
                key,
                type: TypeMapper.mapCSharpTypeToTypeScript(field.type),
                required: !field.isNullable
            };
        });

        return `static readonly metadata: ISettingsMetadata = {
            groupName: '${parsedClass.name}',
            settings: ${JSON.stringify(settings, null, 4)}
        };`;
    }

    private generateJsonSettingClass(classInfo: ParsedClass | (ParsedField & { fields?: ParsedField[] })): string {
        const fields = 'fields' in classInfo ? classInfo.fields : [];
        const jsonFields = fields.filter(f => f.documentation?.includes('```json'));
        if (jsonFields.length === 0) return '';

        // Create a combined config type for all JSON fields
        const configFields = jsonFields.map(field => {
            const settingName = field.name.charAt(0).toLowerCase() + field.name.slice(1);
            return `    ${settingName}: ${settingName}Config;`;
        }).join('\n');

        const configType = `${classInfo.name}JsonConfig`;
        const result = `
interface ${configType} {
${configFields}
}

class JsonSettingsManager extends JsonSetting<${configType}> {
    protected settingKey = '${classInfo.name}.JsonSettings';
    protected defaultValue: ${configType} = {
        ${jsonFields.map(field => {
            const settingName = field.name.charAt(0).toLowerCase() + field.name.slice(1);
            return `${settingName}: ${this.getDefaultValueForType(field.type)}`;
        }).join(',\n        ')}
    };
}`;

        return result;
    }

    private generateSettingField(field: ParsedField, classInfo: ParsedClass): string | null {
        if (!this.isSettingField(field)) {
            return null;
        }

        const settingName = field.name.charAt(0).toLowerCase() + field.name.slice(1);
        const cleanType = this.cleanTypeName(field.type);
        const tsType = TypeMapper.mapCSharpTypeToTypeScript(cleanType);
        
        // If field has JSON documentation, create a virtual field
        if (field.documentation?.includes('```json')) {
            const configType = `${settingName}Config`;
            return `
    get ${settingName}(): ${configType} {
        return this._jsonSettings.value.${settingName};
    }
    set ${settingName}(value: ${configType}) {
        this._jsonSettings.value = { ...this._jsonSettings.value, ${settingName}: value };
    }`;
        }

        // Otherwise create a normal field
        return `
    private _${settingName}: ${tsType};
    get ${settingName}(): ${tsType} {
        return this._${settingName};
    }
    set ${settingName}(value: ${tsType}) {
        this._${settingName} = value;
    }`;
    }

    private generateToSettings(classInfo: ParsedClass): string {
        let result = '    toSettings(): Setting[] {\n';
        result += '        return [\n';
        
        // Add JSON settings if any exist
        const jsonFields = classInfo.fields.filter(f => f.documentation?.includes('```json'));
        if (jsonFields.length > 0) {
            result += `            this._jsonSettings.toSetting(),\n`;
        }

        // Add normal fields
        if (classInfo.fields) {
            for (const field of classInfo.fields) {
                if (!field.documentation?.includes('```json') && field.settingKey) {
                    const settingName = field.name.charAt(0).toLowerCase() + field.name.slice(1);
                    const dataType = field.type === 'string' ? 'string' : field.type === 'number' || field.type === 'int' ? 'number' : field.type === 'boolean' ? 'boolean' : 'json';
                    result += `            { key: "${classInfo.name}.${field.name}", value: String(this._${settingName}), dataType: '${dataType}' },\n`;
                }
            }
        }
        
        result += '        ];\n';
        result += '    }\n';
        return result;
    }

    private generateFromSettings(classInfo: ParsedClass): string {
        let result = '    fromSettings(settings: Setting[]): void {\n';
        result += '        for (const setting of settings) {\n';
        result += '            switch (setting.key) {\n';
        
        // Add JSON settings case if any exist
        const jsonFields = classInfo.fields.filter(f => f.documentation?.includes('```json'));
        if (jsonFields.length > 0) {
            result += `                case '${classInfo.name}.JsonSettings':\n`;
            result += '                    this._jsonSettings.fromSetting(setting);\n';
            result += '                    break;\n';
        }

        // Add normal fields
        if (classInfo.fields) {
            for (const field of classInfo.fields) {
                if (!field.documentation?.includes('```json')) {
                    const settingName = field.name.charAt(0).toLowerCase() + field.name.slice(1);
                    result += `                case '${classInfo.name}.${field.name}':\n`;
                    const type = field.type;
                    if (type === 'boolean') {
                        result += `                    this._${settingName} = setting.value.toLowerCase() === 'true';\n`;
                    } else if (type === 'number' || type === 'int' || type === 'float' || type === 'double') {
                        result += `                    this._${settingName} = Number(setting.value);\n`;
                    } else {
                        result += `                    this._${settingName} = setting.value;\n`;
                    }
                    result += '                    break;\n';
                }
            }
        }
        
        result += '            }\n';
        result += '        }\n';
        result += '    }\n';
        return result;
    }

    private getDefaultValueForType(type: string): string {
        const settingType = this.mapTypeToSettingType(type);
        switch (settingType) {
            case 'string':
                return '\'\'';
            case 'number':
                return '0';
            case 'boolean':
                return 'false';
            case 'date':
                return 'new Date()';
            case 'array':
                return '[]';
            case 'object':
                return '{}';
            default:
                return 'null';
        }
    }

    private isSettingField(field: ParsedField): boolean {
        // Check for setting key attribute
        if (field.attributes?.some(attr => 
            attr.name === 'SettingKey' || 
            attr.name === 'Setting' ||
            attr.name === 'JsonSetting'
        )) {
            return true;
        }

        // Check for setting key property
        if (field.settingKey) {
            return true;
        }

        // Check for JSON documentation
        if (field.documentation?.includes('```json')) {
            return true;
        }

        return false;
    }

    private getSettingKey(field: ParsedField): string {
        // First check for explicit setting key
        if (field.settingKey) {
            const match = field.settingKey.match(/SettingKey\("([^"]+)"\)/);
            return match ? match[1] : field.settingKey;
        }

        // Check attributes
        const settingAttr = field.attributes?.find(attr => 
            attr.name === 'SettingKey' || 
            attr.name === 'Setting' ||
            attr.name === 'JsonSetting'
        );

        if (settingAttr?.arguments?.length > 0) {
            const argValue = settingAttr.arguments[0].value;
            return argValue.replace(/['"]/g, '');
        }

        // Default to field name
        return field.name;
    }

    private mapTypeToSettingType(type: string): string {
        const typeMap: { [key: string]: string } = {
            'string': 'string',
            'bool': 'boolean',
            'boolean': 'boolean',
            'int': 'number',
            'long': 'number',
            'double': 'number',
            'float': 'number',
            'decimal': 'number',
            'DateTime': 'date',
            'DateTimeOffset': 'date',
            'TimeSpan': 'string',
            'Guid': 'string',
            'Uri': 'string',
            'Array': 'array',
            'List': 'array',
            'Dictionary': 'object',
            'object': 'object',
            'dynamic': 'object'
        };

        // Handle array types
        if (type.endsWith('[]')) {
            return 'array';
        }

        // Handle generic types
        const genericMatch = type.match(/<(.+)>/);
        if (genericMatch) {
            const baseType = type.split('<')[0];
            if (baseType === 'List' || baseType === 'IList' || baseType === 'IEnumerable') {
                return 'array';
            }
            if (baseType === 'Dictionary' || baseType === 'IDictionary') {
                return 'object';
            }
        }

        return typeMap[type] || 'object';
    }

    private getSettingType(tsType: string): string {
        if (tsType.includes('[]')) return 'array';
        if (tsType === 'boolean') return 'boolean';
        if (tsType === 'number') return 'number';
        return 'string';
    }

    private getSettingDataType(tsType: string): string {
        if (tsType.includes('[]')) return 'json';
        if (tsType === 'boolean') return 'boolean';
        if (tsType === 'number') return 'number';
        return 'string';
    }

    private getSettingValue(field: ParsedField): string {
        const tsType = this.typeMapper.mapType(field.type);
        const fieldName = `this._${field.name.charAt(0).toLowerCase() + field.name.slice(1)}`;
        
        if (tsType.includes('[]')) {
            return `JSON.stringify(${fieldName})`;
        }
        if (tsType === 'boolean' || tsType === 'number') {
            return `${fieldName}.toString()`;
        }
        return fieldName;
    }

    private getSettingParser(field: ParsedField): string {
        const tsType = this.typeMapper.mapType(field.type);
        const settingName = `${field.name}Setting`;
        
        if (tsType.includes('[]')) {
            return `JSON.parse(${settingName}.value)`;
        }
        if (tsType === 'boolean') {
            return `${settingName}.value === 'true'`;
        }
        if (tsType === 'number') {
            return `parseFloat(${settingName}.value)`;
        }
        return `${settingName}.value`;
    }
}
