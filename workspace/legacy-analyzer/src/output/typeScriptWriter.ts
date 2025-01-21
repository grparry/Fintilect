import path from 'path';
import { ParsedClass, ParsedField, ParsedEnum } from '../parser/csharpParser';
import { FileService } from '../services/fileService';
import logger from '../utils/logger';
import { TypeMapper } from './typeSystem/typeMapper';
import { PathResolver } from './pathSystem/pathResolver';
import { JsonGenerator } from './generators/jsonGenerator';
import { InterfaceGenerator } from './generators/interfaceGenerator';
import { SettingsGenerator } from './generators/settingsGenerator';

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
        const relativePath = this.pathResolver.getTypeOutputPath(parsedClass);
        const outputPath = path.join(this.fileService.getOutputDir(), relativePath);
        const imports = await this.generateImports(parsedClass);
        const configInterface = this.generateConfigInterface(parsedClass);
        const settingsClass = this.generateClass(parsedClass);
        
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
    public mapCSharpTypeToTypeScript(typeName: string): string {
        // Clean the type name first
        typeName = this.typeMapper.cleanTypeName(typeName);

        // Handle nullable types
        if (typeName.endsWith('?')) {
            const baseType = this.mapCSharpTypeToTypeScript(typeName.slice(0, -1));
            return `${baseType} | null`;
        }

        // Handle Nullable<T> syntax
        const nullableMatch = typeName.match(/^Nullable<(.+)>$/);
        if (nullableMatch) {
            const baseType = this.mapCSharpTypeToTypeScript(nullableMatch[1]);
            return `${baseType} | null`;
        }

        // Handle generic types
        const genericMatch = typeName.match(/^(.*?)<(.+)>$/);
        if (genericMatch) {
            const [, baseType, genericParams] = genericMatch;
            const mappedParams = genericParams.split(',')
                .map(param => this.mapCSharpTypeToTypeScript(param.trim()))
                .join(', ');

            // Handle common collection types
            switch (baseType.trim()) {
                case 'List':
                case 'IList':
                case 'IEnumerable':
                case 'ICollection':
                case 'HashSet':
                case 'Array':
                    // Handle nested collections recursively
                    const elementType = this.mapCSharpTypeToTypeScript(genericParams.trim());
                    return `${elementType}[]`;
                case 'Dictionary':
                case 'IDictionary': {
                    const [keyType, valueType] = mappedParams.split(',').map(t => t.trim());
                    return `{ [key: ${keyType}]: ${valueType} }`;
                }
                default:
                    return `${this.mapPrimitiveType(baseType)}<${mappedParams}>`;
            }
        }

        // Handle array types
        if (typeName.endsWith('[]')) {
            const elementType = this.mapCSharpTypeToTypeScript(typeName.slice(0, -2));
            return `${elementType}[]`;
        }

        return this.mapPrimitiveType(typeName);
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

        const settingsFields = classInfo.fields.map(prop => {
            const settingName = prop.name.charAt(0).toLowerCase() + prop.name.slice(1);
            return `    private readonly _${settingName} = new ${settingName}Setting();`;
        }).join('\n');

        result += settingsFields + '\n\n';

        result += '    constructor() {}\n\n';

        result += '    toSettings(): Setting[] {\n';
        result += '        return [\n';
        result += classInfo.fields.map(prop => {
            const settingName = prop.name.charAt(0).toLowerCase() + prop.name.slice(1);
            return `            this._${settingName}`;
        }).join(',\n');
        result += '\n        ];\n';
        result += '    }\n';

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

    private cleanTypeName(type: string): string {
        // Remove markdown-style links and just keep the type name
        const markdownLinkMatch = type.match(/\[(.*?)\]\(.*?\)/);
        if (markdownLinkMatch) {
            return markdownLinkMatch[1];
        }
        return type;
    }

    private async generateImports(parsedClass: ParsedClass): Promise<string> {
        const imports = new Set(['import { Setting, ISettingsGroup, ISettingsMetadata } from \'@models/base/types\';']);
        
        // Add any additional imports based on field types
        const additionalTypes = new Set<string>();

        // Add config interface type
        additionalTypes.add(`${parsedClass.name}Config`);

        // Add types from fields
        for (const field of parsedClass.fields) {
            const type = this.typeMapper.cleanTypeName(field.type);

            // Handle array types
            const baseType = type.replace(/\[\]$/, '');
            if (!this.typeMapper.isBuiltInType(baseType)) {
                additionalTypes.add(baseType);
            }

            // Handle generic types
            if (type.includes('<')) {
                const genericType = type.match(/<(.+)>/)?.[1];
                if (genericType && !this.typeMapper.isBuiltInType(genericType)) {
                    additionalTypes.add(genericType);
                }
            }

            // Handle direct types
            if (!this.typeMapper.isBuiltInType(type)) {
                additionalTypes.add(type);
            }
        }

        // Generate import paths for all types
        for (const type of additionalTypes) {
            const importPath = this.getImportPath(type);
            if (importPath) {
                imports.add(importPath);
            }
        }

        // Add additional imports
        return Promise.resolve([...imports].join('\n') + '\n');
    }

    private getImportPath(type: string): string | null {
        // Clean the type name first to remove any markdown links
        type = this.typeMapper.cleanTypeName(type);

        // Don't generate imports for built-in types
        if (this.typeMapper.isBuiltInType(type)) {
            return null;
        }

        // Handle array types
        if (type.endsWith('[]')) {
            return this.getImportPath(type.slice(0, -2));
        }

        // Handle generic types
        const genericMatch = type.match(/^(.*?)<(.+)>$/);
        if (genericMatch) {
            const [, baseType, genericParams] = genericMatch;
            const paths = [
                this.getImportPath(baseType),
                ...genericParams.split(',').map(param => this.getImportPath(param.trim()))
            ].filter(Boolean);
            return paths[0] || null;
        }

        // Handle config interfaces
        if (type.endsWith('Config')) {
            return null; // Config interfaces are defined in the same file
        }

        // Get the type info from the registry
        const typeInfo = this.typeMapper.findTypeInfo(type);
        if (!typeInfo) {
            return null;
        }

        // Get the full path to the target file
        const targetFile = typeInfo.directory ? 
            path.join(typeInfo.directory, `${typeInfo.typeName}.ts`) :
            `${typeInfo.typeName}.ts`;

        // Get the relative import path
        const importPath = this.pathResolver.getRelativeImportPath(this.currentFile, targetFile);

        return importPath ? `import { ${type} } from '${importPath}';` : null;
    }

    private generateConfigInterface(parsedClass: ParsedClass): string {
        const fields = parsedClass.fields.map(field => {
            const type = this.typeMapper.mapCSharpTypeToTypeScript(field.type);
            return `    ${field.name}: ${type};`;
        });

        return `export interface ${parsedClass.name}Config {
${fields.join('\n')}
}`;
    }

    private generateClass(parsedClass: ParsedClass): string {
        const fields = parsedClass.fields.map(field => {
            const type = this.typeMapper.mapCSharpTypeToTypeScript(field.type);
            return `    private _${field.name}: ${type};
    get ${field.name}(): ${type} {
        return this._${field.name};
    }`;
        });

        return `export class ${parsedClass.name} {
${fields.join('\n\n')}

    constructor() {}

    toSettings(): Setting[] {
        return [
${parsedClass.fields.map(field => `            { key: '${field.name}', value: this._${field.name} }`).join(',\n')}
        ];
    }

    fromSettings(settings: Setting[]): void {
        for (const setting of settings) {
            switch (setting.key) {
${parsedClass.fields.map(field => `                case '${field.name}':
                    this._${field.name} = setting.value;
                    break;`).join('\n')}
            }
        }
    }
}`;
    }
}
