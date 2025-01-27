import { OutputWriter } from '@/writer';
import { ParsedClass, ParsedField, ParsedEnum } from '@/parser/types';
import { FileService } from '@/services/fileService';
import logger from '@/utils/logger';
import { TypeMapper } from '@/typeSystem/typeMapper';
import { PathResolver } from '@/pathSystem/pathResolver';
import { JsonGenerator } from '@/generators/jsonGenerator';
import { InterfaceGenerator } from '@/generators/interfaceGenerator';
import { SettingsGenerator } from '@/generators/settingsGenerator';
import path from 'path';

export class TypeScriptWriter {
    private readonly typeMapper: TypeMapper;
    private readonly jsonGenerator: JsonGenerator;
    private readonly interfaceGenerator: InterfaceGenerator;
    private readonly settingsGenerator: SettingsGenerator;
    private readonly pathResolver: PathResolver;

    constructor(
        private readonly fileService: FileService,
        private currentFile: string,
        private currentNamespace: string,
        pathResolver?: PathResolver
    ) {
        this.typeMapper = new TypeMapper();
        this.pathResolver = pathResolver || new PathResolver();
        this.jsonGenerator = new JsonGenerator(this.typeMapper);
        this.interfaceGenerator = new InterfaceGenerator(this.typeMapper);
        this.settingsGenerator = new SettingsGenerator();
    }

    /**
     * Write TypeScript type definition
     */
    public async writeTypeDefinition(parsedClass: ParsedClass, sourceFilePath: string): Promise<void> {
        // Register the class and its fields
        this.registerType(parsedClass.name, parsedClass.namespace);
        for (const field of parsedClass.fields) {
            if (!this.isPrimitiveType(field.type)) {
                // Handle generic collections
                const genericMatch = field.type.match(/^(List|IList|IEnumerable|ICollection|HashSet)<(.+)>$/);
                if (genericMatch) {
                    const [_, genericType, innerType] = genericMatch;
                    if (!this.isPrimitiveType(innerType)) {
                        this.registerType(innerType, parsedClass.namespace);
                    }
                } else {
                    this.registerType(field.type, parsedClass.namespace);
                }
            }
        }
        
        const relativePath = this.pathResolver.getTypeOutputPath(parsedClass);
        const outputPath = path.join(this.fileService.getOutputDir(), relativePath);
        const imports = this.generateImports(parsedClass);
        const configInterface = this.generateInterface(parsedClass);
        const settingsClass = this.generateSettingsGroup(parsedClass);
        
        const content = [
            imports,
            configInterface,
            '',
            settingsClass
        ].join('\n');
        
        // Ensure the directory exists
        await this.fileService.ensureDir(path.dirname(outputPath));
        
        // Write the file
        await this.fileService.writeFile(outputPath, content);
    }

    /**
     * Write TypeScript enum definition to a separate file
     */
    public async writeEnumDefinition(enumDef: ParsedClass | ParsedEnum, sourceFilePath: string): Promise<void> {
        const outputPath = this.pathResolver.getTypeOutputPath(enumDef);
        const fullPath = path.join(this.fileService.getOutputDir(), outputPath);
        
        // Ensure the directory exists
        await this.fileService.ensureDir(path.dirname(fullPath));
        
        // Write the file
        await this.fileService.writeFile(
            fullPath,
            this.interfaceGenerator.generateEnumType(enumDef)
        );
    }

    /**
     * Set the current file being processed
     */
    public setCurrentFile(file: string): void {
        this.currentFile = file;
        this.typeMapper.setCurrentFile(file);
    }

    /**
     * Set the current namespace being processed
     */
    public setCurrentNamespace(namespace: string): void {
        this.currentNamespace = namespace;
        this.typeMapper.setCurrentNamespace(namespace);
    }

    /**
     * Map C# type to TypeScript type
     */
    public mapCSharpTypeToTypeScript(csharpType: string): string {
        return TypeMapper.mapCSharpTypeToTypeScript(csharpType);
    }

    /**
     * Register a type with its namespace
     */
    public registerType(typeName: string, namespace: string, directory = ''): void {
        this.typeMapper.registerType(typeName, namespace, directory);
    }

    /**
     * Generate JSON interface from example
     */
    public generateJsonInterface(jsonExample: string): string {
        return this.jsonGenerator.generateJsonInterface(jsonExample);
    }

    /**
     * Generate JSON helper class
     */
    public generateJsonHelperClass(field: ParsedField): string {
        return this.jsonGenerator.generateJsonHelperClass(field);
    }

    /**
     * Generate settings group
     */
    public generateSettingsGroup(classInfo: ParsedClass): string {
        let result = `export class ${classInfo.name} implements ISettingsGroup {\n`;
        
        // Add metadata with only valid properties
        result += '    static readonly metadata: ISettingsMetadata = {\n';
        result += `        groupName: '${classInfo.name}'\n`;
        result += '    };\n\n';

        const properties = this.generateClassProperties(classInfo.fields);
        result += properties + '\n\n';

        result += '    constructor() {}\n\n';

        const toSettings = this.generateToSettings(classInfo.name, classInfo.fields);
        result += toSettings + '\n';

        result += '}';

        return result;
    }

    public generateSettingsGroupClass(className: string, properties: ParsedField[]): string {
        const settingsFields = properties.map(prop => {
            const settingName = prop.name.charAt(0).toLowerCase() + prop.name.slice(1);
            return `    private readonly _${settingName} = new ${settingName}Setting();`;
        }).join('\n');

        return `export class ${className} implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: '${className}'
    };

${settingsFields}

    constructor() {}

    toSettings(): Setting[] {
        return [
${properties.map(prop => {
    const settingName = prop.name.charAt(0).toLowerCase() + prop.name.slice(1);
    return `            this._${settingName}`;
}).join(',\n')}
        ];
    }
}`;
    }

    private generateClassProperties(fields: ParsedField[]): string {
        let properties = '';
        for (const field of fields) {
            const fieldName = field.name.charAt(0).toLowerCase() + field.name.slice(1);
            let type = field.type;

            // Handle namespace-qualified types
            if (type.includes('.')) {
                const simpleType = type.split('.').pop() || type;
                type = simpleType;
            }

            // Convert C# collection types to TypeScript equivalents
            const genericMatch = field.type.match(/^(List|IList|IEnumerable|ICollection|HashSet)<(.+)>$/);
            if (genericMatch) {
                const innerType = this.typeMapper.mapType(genericMatch[2]);
                type = `${innerType}[]`;
            }

            const dictionaryMatch = field.type.match(/^Dictionary<(.+),\s*(.+)>$/);
            if (dictionaryMatch) {
                const keyType = this.typeMapper.mapType(dictionaryMatch[1]);
                const valueType = this.typeMapper.mapType(dictionaryMatch[2]);
                type = `Record<${keyType}, ${valueType}>`;
            } else {
                type = this.typeMapper.mapType(type);
            }

            properties += `\n            private _${fieldName}: ${type};`;
            properties += `\n            get ${fieldName}(): ${type} {`;
            properties += `\n                return this._${fieldName};`;
            properties += '\n            }';
            properties += `\n            set ${fieldName}(value: ${type}) {`;
            properties += `\n                this._${fieldName} = value;`;
            properties += '\n            }\n';
        }
        return properties;
    }

    private generateToSettings(className: string, fields: ParsedField[]): string {
        let toSettings = '\n        toSettings(): Setting[] {\n';
        toSettings += '            return [\n';
        
        // Create a mock ParsedClass for type resolution
        const mockClass: ParsedClass = {
            name: className,
            namespace: this.currentNamespace,
            fields: [],
            type: 'class',
            enums: []
        };
        
        for (const field of fields) {
            const fieldName = field.name.charAt(0).toLowerCase() + field.name.slice(1);
            const key = `${className}.${field.name}`;
            const label = this.formatLabel(key);
            
            // Map the type to a TypeScript type for dataType
            let dataType = this.typeMapper.mapType(field.type).toLowerCase();
            
            // Handle collection types
            const genericMatch = field.type.match(/^(List|IList|IEnumerable|ICollection|HashSet|Dictionary)<(.+)>$/);
            if (genericMatch) {
                // Don't generate imports for the generic container type itself
                const typeParams = this.extractTypeParameters(field.type);
                for (const innerType of typeParams) {
                    if (!this.isPrimitiveType(innerType)) {
                        const importPath = this.pathResolver.getRelativeImportPath(mockClass, innerType);
                        if (importPath) {
                            // Get the simple type name (without namespace)
                            const simpleType = innerType.split('.').pop() || innerType;
                            dataType = `array<${simpleType}>`;
                        }
                    }
                }
            }

            const dictionaryMatch = field.type.match(/^Dictionary<(.+),\s*(.+)>$/);
            if (dictionaryMatch) {
                const keyType = this.typeMapper.mapType(dictionaryMatch[1]).toLowerCase();
                const valueType = this.typeMapper.mapType(dictionaryMatch[2]).toLowerCase();
                dataType = `record<${keyType}, ${valueType}>`;
            }

            toSettings += `                { key: "${key}", value: this._${fieldName}, dataType: '${dataType}', label: "${label}" },\n`;
        }
        
        toSettings += '            ];\n';
        toSettings += '        }\n';
        return toSettings;
    }

    private generateInterface(parsedClass: ParsedClass): string {
        const fields = parsedClass.fields
            .map(field => {
                let type = field.type;
                
                // Handle namespace-qualified types
                if (type.includes('.')) {
                    const simpleType = type.split('.').pop() || type;
                    type = simpleType;
                }

                type = this.typeMapper.mapType(type);
                
                // Convert C# collection types to TypeScript equivalents
                const genericMatch = field.type.match(/^(List|IList|IEnumerable|ICollection|HashSet)<(.+)>$/);
                if (genericMatch) {
                    const innerType = this.typeMapper.mapType(genericMatch[2]);
                    type = `${innerType}[]`;
                }
                
                const dictionaryMatch = field.type.match(/^Dictionary<(.+),\s*(.+)>$/);
                if (dictionaryMatch) {
                    const keyType = this.typeMapper.mapType(dictionaryMatch[1]);
                    const valueType = this.typeMapper.mapType(dictionaryMatch[2]);
                    type = `Record<${keyType}, ${valueType}>`;
                }

                const nullableSuffix = field.isNullable ? '?' : '';
                return `    ${field.name}${nullableSuffix}: ${type};`;
            })
            .join('\n');

        return `export interface ${parsedClass.name}Config {\n${fields}\n}`;
    }

    private generateImports(parsedClass: ParsedClass): string {
        const imports = new Set<string>();
        imports.add('import { Setting, ISettingsGroup, ISettingsMetadata } from \'@models/base/types\';');

        // Add imports for fields
        for (const field of parsedClass.fields) {
            const type = field.type;
            // Skip primitive types
            if (this.isPrimitiveType(type)) {
                continue;
            }

            // Handle namespace-qualified types first
            if (type.includes('.')) {
                const [namespace, typeName] = type.split('.');
                // Skip if the type name itself is primitive
                if (!this.isPrimitiveType(typeName)) {
                    const importPath = this.pathResolver.getRelativeImportPath(parsedClass, type);
                    if (importPath) {
                        imports.add(`import { ${typeName} } from '${importPath}';`);
                    }
                }
                continue;
            }

            // Handle generic collections
            const genericMatch = type.match(/^(List|IList|IEnumerable|ICollection|HashSet|Dictionary)<(.+)>$/);
            if (genericMatch) {
                // Don't generate imports for the generic container type itself
                const typeParams = this.extractTypeParameters(type);
                for (const innerType of typeParams) {
                    if (!this.isPrimitiveType(innerType)) {
                        const importPath = this.pathResolver.getRelativeImportPath(parsedClass, innerType);
                        if (importPath) {
                            // Get the simple type name (without namespace)
                            const simpleType = innerType.split('.').pop() || innerType;
                            if (!this.isPrimitiveType(simpleType)) {
                                imports.add(`import { ${simpleType} } from '${importPath}';`);
                            }
                        }
                    }
                }
                continue;
            }

            // Handle regular types (skip if primitive)
            const simpleType = type.split('.').pop() || type;
            if (!this.isPrimitiveType(simpleType)) {
                const importPath = this.pathResolver.getRelativeImportPath(parsedClass, type);
                if (importPath) {
                    imports.add(`import { ${simpleType} } from '${importPath}';`);
                }
            }
        }

        return Array.from(imports).join('\n');
    }

    private cleanTypeName(type: string): string {
        return type.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    }

    private extractTypeParameters(type: string): string[] {
        // Extract type parameters from generic types like List<T> or Dictionary<K,V>
        const match = type.match(/<(.+)>/);
        if (!match) return [];
        
        // Split by comma but ignore commas within nested generics
        const params = [];
        let current = '';
        let depth = 0;
        
        for (const char of match[1]) {
            if (char === '<') depth++;
            else if (char === '>') depth--;
            else if (char === ',' && depth === 0) {
                params.push(current.trim());
                current = '';
                continue;
            }
            current += char;
        }
        if (current) params.push(current.trim());
        
        return params;
    }

    private formatLabel(key: string): string {
        // Get the last part after any dots
        const parts = key.split('.');
        const lastPart = parts[parts.length - 1];

        // Convert camelCase to Title Case with spaces
        return lastPart
            .replace(/([A-Z])/g, ' $1') // Add space before capital letters
            .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
            .trim(); // Remove leading/trailing spaces
    }

    private isPrimitiveType(type: string): boolean {
        // Use TypeMapper to check if the type maps to a built-in type
        return this.typeMapper.mapsToBuiltInType(type);
    }
}
