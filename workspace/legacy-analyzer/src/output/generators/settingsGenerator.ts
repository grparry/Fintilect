import { ParsedClass, ParsedField, ParsedAttribute } from '@/../parser/types';
import logger from '@/../utils/logger';
import { TypeMapper } from '@/typeSystem/typeMapper'; 

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
            for (const field of classInfo.fields) {
                if (field.documentation?.includes('```json')) {
                    // JSON field
                    const settingName = field.name.charAt(0).toLowerCase() + field.name.slice(1);
                    result += `    private readonly _${settingName} = new ${settingName}Setting();\n`;
                    result += `    get ${settingName}(): ${settingName}Config {\n`;
                    result += `        return this._${settingName}.value;\n`;
                    result += '    }\n\n';
                } else {
                    // Simple field
                    const settingName = field.name.charAt(0).toLowerCase() + field.name.slice(1);
                    const cleanType = this.cleanTypeName(field.type);
                    const tsType = TypeMapper.mapCSharpTypeToTypeScript(cleanType);
                    result += `    private _${settingName}: ${tsType};\n`;
                    result += `    get ${settingName}(): ${tsType} {\n`;
                    result += `        return this._${settingName};\n`;
                    result += '    }\n\n';
                }
            }
        }
        
        // Add constructor
        result += '    constructor() {}\n\n';
        
        // Add toSettings method
        result += '    toSettings(): Setting[] {\n';
        result += '        return [\n';
        
        // Generate settings for each field
        if (classInfo.fields) {
            for (const field of classInfo.fields) {
                const settingName = field.name.charAt(0).toLowerCase() + field.name.slice(1);
                if (field.documentation?.includes('```json')) {
                    result += `            this._${settingName}.toSetting(),\n`;
                } else if (field.settingKey) {
                    const dataType = field.type === 'string' ? 'string' : field.type === 'number' || field.type === 'int' ? 'number' : 'json';
                    result += `            { key: "${classInfo.name}.${field.name}", value: this._${field.name.charAt(0).toLowerCase() + field.name.slice(1)}, dataType: '${dataType}' },\n`;
                }
            }
        }
        
        result += '        ];\n';
        result += '    }\n';

        // Add fromSettings method
        result += '\n    fromSettings(settings: Setting[]): void {\n';
        result += '        for (const setting of settings) {\n';
        result += '            switch (setting.key) {\n';
        
        // Generate cases for each field
        if (classInfo.fields) {
            for (const field of classInfo.fields) {
                const settingName = field.name.charAt(0).toLowerCase() + field.name.slice(1);
                if (field.documentation?.includes('```json')) {
                    result += `                case '${classInfo.name}.${field.name}':\n`;
                    result += `                    this._${settingName}.fromSetting(setting);\n`;
                    result += '                    break;\n';
                } else {
                    result += `                case '${classInfo.name}.${field.name}':\n`;
                    if (field.type === 'boolean') {
                        result += `                    this._${settingName} = Boolean(setting.value);\n`;
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
        
        result += '}\n';
        
        return result;
    }

    private generateSettingsMetadata(parsedClass: ParsedClass): string {
        const settings = parsedClass.fields.map(field => {
            const key = `${parsedClass.name}.${field.name}`;
            return `{
                        key: "${key}",
                        type: "${TypeMapper.mapCSharpTypeToTypeScript(field.type)}",
                        label: "${this.formatLabel(field.name)}",
                        description: "${field.documentation || field.name}"
                    }`;
        });

        return `static readonly metadata: ISettingsMetadata = {
                groups: [{
                    key: '${parsedClass.name}',
                    label: '${this.formatLabel(parsedClass.name)}',
                    settings: [
                        ${settings.join(',\n                        ')}
                    ]
                }],
                version: '1.0.0',
                lastUpdated: new Date().toISOString()
            };`;
    }

    /**
     * Generate settings class
     */
    public generateSettingsClass(className: string, fields: ParsedField[]): string {
        const imports = new Set<string>();
        imports.add('import { Setting } from \'@cbp/config-api-types\';');
        imports.add('import { ISettingsGroup, ISettingsMetadata } from \'../../settings.types\';');

        const settingFields = fields.map(field => {
            const { name, type, settingKey } = field;
            const cleanType = this.cleanTypeName(type);
            const tsType = TypeMapper.mapCSharpTypeToTypeScript(cleanType);
            
            // Add imports for complex types
            if (tsType.includes('.')) {
                const [namespace, typeName] = tsType.split('.');
                imports.add(`import { ${typeName} } from '../../infrastructure/models/${namespace}';`);
            }
            
            return {
                fieldName: name.charAt(0).toLowerCase() + name.slice(1),
                settingType: tsType,
                defaultValue: this.getDefaultValueForType(tsType),
                settingKey: settingKey
            };
        });

        const importStatements = Array.from(imports).join('\n');
        const fieldDeclarations = settingFields.map(field => 
            `    private _${field.fieldName}: ${field.settingType} = ${field.defaultValue};`
        ).join('\n');

        const getterSetters = settingFields.map(field => `
    get ${field.fieldName}(): ${field.settingType} {
        return this._${field.fieldName};
    }

    set ${field.fieldName}(value: ${field.settingType}) {
        this._${field.fieldName} = value;
    }`
        ).join('\n');

        return `${importStatements}

export class ${className} {
${fieldDeclarations}

${getterSetters}
}`;
    }

    /**
     * Generate setting field
     */
    private generateSettingField(field: ParsedField): string | null {
        if (!this.isSettingField(field)) {
            return null;
        }

        const settingKey = this.getSettingKey(field);
        if (!settingKey) {
            return null;
        }

        const type = this.mapTypeToSettingType(field.type);
        const defaultValue = field.defaultValue !== undefined ? 
            this.formatDefaultValue(field.defaultValue, field.type) : 
            this.getDefaultValueForType(field.type);

        return `{
            key: '${settingKey}',
            value: ${this.generateValueGetter(field)},
            type: '${type}',
            validationRules: ${JSON.stringify(field.validationRules || [])}
        }`;
    }

    private generateValueGetter(field: ParsedField): string {
        const fieldName = field.name.charAt(0).toLowerCase() + field.name.slice(1);
        const type = this.mapTypeToSettingType(field.type);

        if (type === 'object' || type === 'array') {
            return `JSON.stringify(this._${fieldName})`;
        } else if (type === 'date') {
            return `this._${fieldName}.toISOString()`;
        } else if (type === 'boolean') {
            return `Boolean(this._${fieldName})`;
        } else {
            return `this._${fieldName}`;
        }
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
}
