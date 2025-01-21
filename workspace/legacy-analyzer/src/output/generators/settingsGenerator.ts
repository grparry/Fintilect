import { ParsedClass, ParsedField } from '../../parser/csharpParser';
import logger from '../../utils/logger';
import { TypeMapper } from '../typeSystem/typeMapper'; 

export class SettingsGenerator {
    private typeMapper: TypeMapper;

    constructor() {
        this.typeMapper = new TypeMapper();
    }

    /**
     * Generate settings group class
     */
    public generateSettingsGroup(classInfo: ParsedClass): string {
        let result = `export class ${classInfo.name} implements ISettingsGroup {\n`;
        
        // Add metadata with settings property
        result += '    static readonly metadata: ISettingsMetadata = {\n';
        result += `        groupName: '${classInfo.name}',\n`;
        result += '        settings: {\n';
        
        // Add settings metadata for each field
        if (classInfo.fields) {
            for (const field of classInfo.fields) {
                if (field.settingKey) {
                    const settingName = field.name.charAt(0).toLowerCase() + field.name.slice(1);
                    result += `            ${settingName}: {\n`;
                    result += `                key: '${field.settingKey}',\n`;
                    result += `                type: '${this.mapTypeToSettingType(field.type)}',\n`;
                    result += '                required: true\n';
                    result += '            },\n';
                }
            }
        }
        
        result += '        }\n';
        result += '    };\n\n';

        // Add setting key constants
        if (classInfo.fields) {
            for (const field of classInfo.fields) {
                if (field.settingKey) {
                    const settingName = field.name.charAt(0).toLowerCase() + field.name.slice(1);
                    result += `    static readonly ${settingName}Key = '${field.settingKey}';\n`;
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
                    const tsType = this.typeMapper.mapCSharpTypeToTypeScript(field.type);
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
                    result += `            { key: '${field.settingKey}', value: JSON.stringify(this._${settingName}), dataType: '${dataType}' },\n`;
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
                    result += `                case '${classInfo.name}.${field.settingKey}':\n`;
                    result += `                    this._${settingName}.fromSetting(setting);\n`;
                    result += '                    break;\n';
                } else {
                    result += `                case '${classInfo.name}.${field.settingKey}':\n`;
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

    /**
     * Generate settings class
     */
    public generateSettingsClass(className: string, fields: ParsedField[]): string {
        const imports = new Set<string>();
        const settingFields = fields.map(field => {
            const { name, type, settingKey } = field;
            const tsType = this.typeMapper.mapCSharpTypeToTypeScript(type);
            
            // Add imports for complex types
            if (tsType.includes('.')) {
                const importPath = tsType.split('.')[0];
                imports.add(`import { ${tsType} } from './${importPath}';`);
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
        this.onSettingChanged();
    }`).join('\n');

        return `${importStatements}
import { Setting, ISettingsGroup, ISettingsMetadata } from './interfaces';

export class ${className} implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: '${className}',
        description: 'Settings for ${className}',
        category: 'UserSettings'
    };

${fieldDeclarations}

    constructor() {
        this.initializeDefaults();
    }

    private initializeDefaults(): void {
        // Initialize default values if needed
    }

    private onSettingChanged(): void {
        // Handle setting changes
    }
${getterSetters}

    toSettings(): Setting[] {
        return [
${settingFields.map(field => 
            `            { key: '${field.settingKey}', value: this._${field.fieldName}, dataType: '${field.settingType === 'string' ? 'string' : field.settingType === 'number' ? 'number' : 'json'}' }`
        ).join(',\n')}
        ];
    }
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

        return `{
            key: '${settingKey}',
            value: this.${field.name},
            type: '${this.getSettingType(field.type)}',
            validationRules: ${JSON.stringify(field.validationRules || [])}
        }`;
    }

    private isSettingField(field: ParsedField): boolean {
        return field.attributes?.some(attr => 
            attr.name === 'SettingKey' || 
            attr.name === 'Setting'
        ) ?? false;
    }

    private getSettingKey(field: ParsedField): string {
        // The settingKey will be in the format: SettingKey("test.setting1")
        // Extract just the value inside the quotes
        const match = field.settingKey.match(/SettingKey\("([^"]+)"\)/);
        return match ? match[1] : field.settingKey;
    }

    private getSettingType(type: string): string {
        const typeMap: { [key: string]: string } = {
            'string': 'string',
            'bool': 'boolean',
            'int': 'number',
            'long': 'number',
            'double': 'number',
            'decimal': 'number',
            'DateTime': 'date',
            'Guid': 'string'
        };

        return typeMap[type] || 'string';
    }

    private mapTypeToSettingType(type: string): string {
        const typeMap: { [key: string]: string } = {
            'string': 'string',
            'bool': 'boolean',
            'int': 'number',
            'long': 'number',
            'double': 'number',
            'decimal': 'number',
            'DateTime': 'date',
            'Guid': 'string'
        };

        return typeMap[type] || 'string';
    }

    private getDefaultValueForType(type: string): string {
        switch (type) {
            case 'string':
                return '\'\'';
            case 'number':
                return '0';
            case 'boolean':
                return 'false';
            case 'Date':
                return 'new Date()';
            case 'any':
                return 'null';
            default:
                if (type.endsWith('[]')) {
                    return '[]';
                }
                if (type.includes('|')) {
                    return 'null';
                }
                return 'null';
        }
    }
}
