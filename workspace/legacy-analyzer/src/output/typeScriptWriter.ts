import path from 'path';
import { ParsedClass, ParsedField, ParsedEnum, ParsedClassType } from '../parser/csharpParser';
import { FileService } from '../services/fileService';
import logger from '../utils/logger';
import * as fs from 'fs';

const logger2 = logger;

export class TypeScriptWriter {
    private typeRegistry: Map<string, { namespace: string, directory: string }> = new Map();

    constructor(private readonly fileService: FileService, private currentFile: string, private currentNamespace: string) {}

    /**
     * Core Type System
     * ---------------
     * Methods for managing and converting types between C# and TypeScript
     */

    /**
     * Get the output path for a TypeScript type file
     */
    private getTypeOutputPath(parsedClass: ParsedClass, importingClass?: ParsedClass): string {
        logger2.info('getTypeOutputPath called with:', {
            className: parsedClass.name,
            namespace: parsedClass.namespace,
            importingClass: importingClass?.name
        });
        
        const parts = [];
        let directory = '';
        
        if (parsedClass.namespace) {
            // Split namespace and get the meaningful parts for the directory
            const namespaceParts = parsedClass.namespace.split('.');
            logger2.info('Namespace parts:', namespaceParts);
            
            // Check if this is in or under the root namespace (Psi.Models.ClientConfigurationModels or Psi.Data.Models.ClientConfigurationModels)
            const isInRootNamespace = (
                // Handle Psi.Models.ClientConfigurationModels
                (namespaceParts.length === 3 && 
                namespaceParts[0] === 'Psi' && 
                namespaceParts[1] === 'Models' && 
                namespaceParts[2] === 'ClientConfigurationModels') ||
                // Handle Psi.Data.Models.ClientConfigurationModels
                (namespaceParts.length === 4 &&
                namespaceParts[0] === 'Psi' &&
                namespaceParts[1] === 'Data' &&
                namespaceParts[2] === 'Models' &&
                namespaceParts[3] === 'ClientConfigurationModels')
            );
            
            logger2.info('Is in root namespace:', isInRootNamespace);
            logger2.info('Namespace parts length:', namespaceParts.length);
            
            if (!isInRootNamespace) {
                // For non-root namespaces, use the last part as the directory
                directory = namespaceParts[namespaceParts.length - 1];
                parts.push(directory);
                logger2.info('Added non-root directory:', directory);
            } else {
                // For files under ClientConfigurationModels, use the subdirectory name if it exists
                const subdirIndex = namespaceParts.indexOf('ClientConfigurationModels') + 1;
                if (subdirIndex < namespaceParts.length) {
                    directory = namespaceParts.slice(subdirIndex).join('/');
                    parts.push(directory);
                    logger2.info('Added subdirectory:', directory);
                }
                // Always register with a directory, even if empty
                this.registerType(parsedClass.name, parsedClass.namespace, directory);
            }
        }
        
        // Add class name
        parts.push(parsedClass.name);
        logger2.info('Final parts array:', parts);
        
        // If this is for an import, return the simplified path format
        if (importingClass) {
            // Get the subdirectory and class name
            const classDir = parts[0];
            const className = parts[1];
            
            // Check if the current file is in the root models directory
            const currentFileDir = path.dirname(this.currentFile);
            const isInRootDir = !currentFileDir.split(path.sep).slice(-2, -1)[0] || 
                               currentFileDir.split(path.sep).slice(-2, -1)[0] === 'models';
            
            // For imports from root directory files, include the full subdirectory path
            if (isInRootDir) {
                return classDir ? `./${classDir}/${className}` : `./${className}`;
            }
            
            // For imports within subdirectories, use relative paths
            return `./${className}`;
        }
        
        // For file output, add .ts extension
        const finalPath = path.join('infrastructure', 'models', ...parts) + '.ts';
        logger2.info('Generated final path:', finalPath);
        return finalPath;
    }

    /**
     * Generate TypeScript type definition for a field
     */
    private generateFieldType(field: ParsedField): string {
        let typeDefinition = '';
        
        // Always use the original field name, camelCased
        const fieldName = field.name.charAt(0).toLowerCase() + field.name.slice(1);
        
        // Add JSDoc comment with setting key if present
        if (field.settingKey) {
            typeDefinition += `    /** @settingKey ${field.settingKey} */\n`;
        }

        // Add JSDoc comment with documentation if present
        if (field.documentation) {
            const docLines = field.documentation
                .split('\n')
                .map((line: string) => line.trim())
                .filter((line: string) => line.length > 0);

            if (docLines.length > 0) {
                typeDefinition += '    /**\n';
                if (docLines.length === 1) {
                    docLines.forEach((line: string) => {
                        typeDefinition += `     * ${line}\n`;
                    });
                } else {
                    typeDefinition += '     * /// <summary>\n';
                    docLines.forEach((line: string) => {
                        typeDefinition += `     * /// ${line}\n`;
                    });
                    typeDefinition += '     * /// </summary>\n';
                }
                typeDefinition += '     */\n';
            }
        }

        // Add the field definition
        let tsType = this.mapCSharpTypeToTypeScript(field.type);
        
        // If it's a List<primitive> property, use the array type directly
        const genericMatch = field.type.match(/^(List|IList|IEnumerable|ICollection|HashSet)<(.+)>$/);
        if (genericMatch) {
            const [_, genericType, innerType] = genericMatch;
            const primitiveTypes = ['string', 'bool', 'int', 'long', 'double', 'decimal', 'DateTime', 'Guid', 'object'];
            if (primitiveTypes.includes(innerType)) {
                // Use the original field name
                const cleanType = this.mapCSharpTypeToTypeScript(innerType);
                const nullableSuffix = field.isNullable ? ' | null' : '';
                typeDefinition += `    ${fieldName}: ${cleanType}[]${nullableSuffix};\n`;
                return typeDefinition;
            }
        }

        // For all cases, use the original field name
        const nullableSuffix = field.isNullable ? ' | null' : '';
        typeDefinition += `    ${fieldName}: ${tsType}${nullableSuffix};\n`;
        return typeDefinition;
    }

    /**
     * Generate TypeScript enum definition
     */
    private generateEnumType(enumDef: ParsedEnum): string {
        let enumDefinition = '';
        
        // Add documentation if present
        if (enumDef.documentation) {
            enumDefinition += '/** ' + enumDef.documentation + ' */\n';
        }
        
        enumDefinition += `export enum ${enumDef.name} {\n`;
        
        // Add enum values
        enumDef.values.forEach(value => {
            enumDefinition += `    ${value.name} = ${typeof value.value === 'string' ? `'${value.value}'` : value.value},\n`;
        });
        
        enumDefinition += '}\n';
        
        return enumDefinition;
    }

    /**
     * Map C# types to TypeScript types
     */
    private mapCSharpTypeToTypeScript(csharpType: string): string {
        // Check for generic types like List<T>
        const genericMatch = csharpType.match(/^(List|IList|IEnumerable|ICollection|HashSet)<(.+)>$/);
        if (genericMatch) {
            const [_, genericType, innerType] = genericMatch;
            // Map common C# collection types to TypeScript array
            if (['List', 'IList', 'IEnumerable', 'ICollection', 'HashSet'].includes(genericType)) {
                // Don't register the type if it's a primitive type
                const primitiveTypes = ['string', 'bool', 'int', 'long', 'double', 'decimal', 'DateTime', 'Guid', 'object'];
                if (!primitiveTypes.includes(innerType)) {
                    // Only register non-primitive inner types
                    const typeInfo = this.findTypeInfo(innerType);
                    if (typeInfo) {
                        this.registerType(innerType, typeInfo.namespace, typeInfo.directory);
                    }
                }
                return `${this.mapCSharpTypeToTypeScript(innerType)}[]`;
            }
            // For other generic types, keep the same structure
            return `${genericType}<${this.mapCSharpTypeToTypeScript(innerType)}>`;
        }

        const typeMap: { [key: string]: string } = {
            'string': 'string',
            'bool': 'boolean',
            'int': 'number',
            'long': 'number',
            'double': 'number',
            'decimal': 'number',
            'DateTime': 'Date',
            'Guid': 'string',
            'object': 'any'
        };

        // If it's not a built-in type, register it for import
        if (!typeMap[csharpType] && !this.isBuiltInType(csharpType)) {
            const typeInfo = this.findTypeInfo(csharpType);
            if (typeInfo) {
                this.registerType(csharpType, typeInfo.namespace, typeInfo.directory);
            }
        }

        return typeMap[csharpType] || csharpType;
    }

    /**
     * Register a type and its namespace
     */
    public registerType(typeName: string, namespace: string, directory: string = '') {
        logger2.info('Registering type:', { 
            typeName, 
            namespace, 
            directory,
            stackTrace: new Error().stack 
        });

        // Skip registering List<primitive> types
        const genericMatch = typeName.match(/^(List|IList|IEnumerable|ICollection|HashSet)<(.+)>$/);
        if (genericMatch) {
            const [_, genericType, innerType] = genericMatch;
            const primitiveTypes = ['string', 'bool', 'int', 'long', 'double', 'decimal', 'DateTime', 'Guid', 'object'];
            if (primitiveTypes.includes(innerType)) {
                return;
            }
        }

        // Check if type already exists with a different directory
        const existing = this.typeRegistry.get(typeName);
        if (existing) {
            logger2.info('Type already registered:', {
                typeName,
                existingNamespace: existing.namespace,
                existingDirectory: existing.directory,
                newNamespace: namespace,
                newDirectory: directory
            });
        }

        this.typeRegistry.set(typeName, { namespace, directory });
    }

    /**
     * Find the namespace and directory for a given type from the registry
     */
    private findTypeInfo(typeName: string): { namespace: string, directory: string } {
        logger2.info('Looking up type info:', { 
            typeName,
            registrySize: this.typeRegistry.size,
            allRegisteredTypes: Array.from(this.typeRegistry.keys()),
            stackTrace: new Error().stack
        });

        const typeInfo = this.typeRegistry.get(typeName);
        if (!typeInfo) {
            logger2.warn('Type not found in registry:', { typeName });
            return { namespace: '', directory: '' };
        }

        logger2.info('Found type info:', { typeName, ...typeInfo });
        return typeInfo;
    }

    /**
     * JSON Generation
     * --------------
     * Methods for generating TypeScript interfaces and helper classes from JSON
     */

    /**
     * Write TypeScript enum definition to a separate file
     */
    public async writeEnumDefinition(enumDef: ParsedClass | ParsedEnum, sourceFilePath: string): Promise<void> {
        try {
            let typeScript = '';
            
            // Add documentation if present
            if (enumDef.documentation) {
                typeScript += '/** ' + enumDef.documentation + ' */\n';
            }
            
            // Generate enum
            typeScript += `export enum ${enumDef.name} {\n`;
            
            // Add enum values - handle both ParsedClass and ParsedEnum
            const values = 'type' in enumDef && enumDef.type === 'enum' ? 
                          enumDef.values : 
                          'values' in enumDef ? enumDef.values : [];

            if (values) {
                values.forEach(value => {
                    // Handle numeric and string values appropriately
                    const enumValue = typeof value.value === 'number' ? 
                        value.value : 
                        `'${value.value}'`;
                    typeScript += `    ${value.name} = ${enumValue},\n`;
                });
            }
            
            typeScript += '}\n';
            
            // Use getTypeOutputPath for consistent path generation
            const outputPath = this.getTypeOutputPath(enumDef as ParsedClass);

            // Write the file
            await this.fileService.writeTypeScript(outputPath, typeScript);
            logger2.info(`Generated TypeScript definition: ${outputPath}`);
        } catch (error) {
            logger2.error(`Error writing enum definition: ${error}`);
            throw error;
        }
    }

    /**
     * Write TypeScript type definition
     */
    public async writeTypeDefinition(parsedClass: ParsedClass, sourceFilePath: string): Promise<void> {
        logger2.info('Writing TypeScript definition:', {
            className: parsedClass.name,
            namespace: parsedClass.namespace,
            sourceFile: sourceFilePath
        });

        // Register the type and its namespace first
        if (parsedClass.namespace) {
            const directory = this.getSubdirectoryFromNamespace(parsedClass.namespace);
            this.registerType(parsedClass.name, parsedClass.namespace, directory);
        }

        const outputPath = this.getTypeOutputPath(parsedClass);
        const imports: { className: string; directory: string; typeScriptFile: string }[] = [];

        // Track imported types to avoid duplicates
        const importedTypes = new Set<string>();

        // Process fields to collect imports
        for (const field of parsedClass.fields) {
            const fieldType = this.mapCSharpTypeToTypeScript(field.type);
            if (!this.isBuiltInType(fieldType) && !importedTypes.has(fieldType)) {
                importedTypes.add(fieldType);
                
                // Find the namespace and directory for this type
                const typeInfo = this.findTypeInfo(fieldType);
                let directory = typeInfo.directory;
                let namespace = typeInfo.namespace;

                // If the type is not registered yet, try to find its namespace from the source file
                if (!directory) {
                    // Extract the namespace from the source file path
                    const sourcePathParts = sourceFilePath.split('/');
                    const modelsIndex = sourcePathParts.indexOf('ClientConfigurationModels');
                    if (modelsIndex !== -1 && modelsIndex < sourcePathParts.length - 1) {
                        // Get all parts after ClientConfigurationModels to form the namespace
                        const subNamespaceParts = sourcePathParts.slice(modelsIndex + 1, -1);
                        namespace = `Psi.Data.Models.ClientConfigurationModels${subNamespaceParts.length ? '.' + subNamespaceParts.join('.') : ''}`;
                        directory = subNamespaceParts.join('/');
                        this.registerType(fieldType, namespace, directory);
                    }
                }
                
                imports.push({
                    className: fieldType,
                    directory: directory || '',
                    typeScriptFile: `${fieldType}.ts`
                });
            }
        }

        await this.writeTypeScriptFile(outputPath, parsedClass.name, parsedClass.namespace || '', parsedClass.fields, imports);
    }

    private isBuiltInType(type: string): boolean {
        const cleanType = type.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
        return ['string', 'number', 'boolean', 'any', 'void', 'null', 'undefined', 'Date'].includes(cleanType);
    }

    private async writeTypeScriptFile(outputPath: string, className: string, namespace: string, properties: ParsedField[], imports: { className: string, directory: string, typeScriptFile: string }[]): Promise<void> {
        // Get the root models directory path
        const rootModelsDir = path.join(this.fileService.getOutputDir(), 'infrastructure', 'models');
        
        // Get the current directory relative to the root models directory
        const fullPath = path.resolve(rootModelsDir, outputPath);
        const relativePath = path.relative(rootModelsDir, path.dirname(fullPath));
        const currentDir = relativePath === '.' ? '' : relativePath;
        
        // Get the subdirectory for this file
        const subdirectory = this.getSubdirectoryFromNamespace(namespace);
        
        logger2.info('Writing TypeScript file:', {
            outputPath,
            className,
            namespace,
            currentDir,
            rootModelsDir,
            relativePath,
            subdirectory,
            dirname: path.dirname(outputPath),
            outputDir: this.fileService.getOutputDir(),
            isRootDir: relativePath === '.',
            isEmptyString: currentDir === '',
            fullPath
        });
        
        let content = '// Generated imports\n';
        
        // Generate imports with the current directory
        for (const imp of imports) {
            content += this.generateImport(imp.className, imp.directory, imp.typeScriptFile, className, currentDir) + '\n';
        }
        
        content += '\n';
        content += this.generateInterface(className, properties);
        
        // Ensure directory exists before writing file
        await this.fileService.ensureDir(path.dirname(outputPath));
        
        // Write the TypeScript file
        await this.fileService.writeTypeScript(outputPath, content);
        logger2.info(`Generated TypeScript definition: ${outputPath}`);
    }

    private generateInterface(className: string, properties: ParsedField[]): string {
        let interfaceDefinition = '';
        
        interfaceDefinition += `export interface ${className} {\n`;
        
        // Add fields
        properties.forEach(field => {
            interfaceDefinition += this.generateFieldType(field);
        });
        
        interfaceDefinition += '}\n';
        
        return interfaceDefinition;
    }

    /**
     * Settings Generation
     * -----------------
     * Methods for generating TypeScript settings classes and interfaces
     */

    private generateJsonHelperClass(field: ParsedField): string {
        if (!field.documentation) {
            logger2.warn('No documentation with JSON example found for property:', field.name);
            return '';
        }

        // Extract JSON example from documentation
        const jsonMatch = field.documentation.match(/```json\s*([\s\S]*?)\s*```/);
        if (!jsonMatch) {
            logger2.warn('No JSON example found in documentation for property:', field.name);
            return '';
        }

        const jsonExample = jsonMatch[1];
        logger2.info('Found JSON example for property:', {
            propertyName: field.name,
            example: jsonExample
        });

        try {
            // Generate the interface for the JSON structure
            const interfaceName = `${field.name}Config`;
            const interfaceDefinition = this.generateTypeFromValue(JSON.parse(jsonExample), '', interfaceName);

            // Generate the helper class
            let classDefinition = '';
            classDefinition += `export class ${field.name}Setting extends JsonSetting<${interfaceName}> {\n`;
            classDefinition += `    protected readonly settingKey = '${field.settingKey || field.name}';\n`;
            classDefinition += `    protected readonly defaultValue: ${interfaceName} = ${jsonExample};\n`;
            classDefinition += `}\n`;
            
            return interfaceDefinition + '\n' + classDefinition;
        } catch (error) {
            logger2.error('Failed to generate JSON helper class:', {
                propertyName: field.name,
                error
            });
            return '';
        }
    }

    private generateJsonInterface(jsonExample: string): string {
        try {
            const jsonData = JSON.parse(jsonExample);
            return this.generateTypeFromValue(jsonData, '', 'Root');
        } catch (error) {
            logger2.error('Failed to parse JSON example:', error);
            return 'export interface Root { [key: string]: any }';
        }
    }

    private generateSettingsGroup(classInfo: ParsedClass): string {
        let code = '';
        
        // Add documentation if present
        if (classInfo.documentation) {
            code += '/**\n';
            code += classInfo.documentation.split('\n')
                .map(line => ` * ${line}`)
                .join('\n');
            code += '\n */\n';
        }

        // Generate the class
        code += `export class ${classInfo.name} {\n`;
        
        // Add fields
        if (classInfo.fields) {
            for (const field of classInfo.fields) {
                if (this.isJsonField(field)) {
                    const jsonHelperClass = this.generateJsonHelperClass(field);
                    if (jsonHelperClass) {
                        code = jsonHelperClass + '\n' + code;
                    }
                }
                code += this.generateSettingField(field);
            }
        }
        
        code += '}\n';
        return code;
    }

    /**
     * Utility Methods
     * -------------
     * Helper methods for string manipulation, formatting, etc.
     */

    /**
     * Extract subdirectory from namespace
     */
    private getSubdirectoryFromNamespace(namespace: string): string {
        if (!namespace) return '';
        
        const parts = namespace.split('.');
        const clientConfigIndex = parts.indexOf('ClientConfigurationModels');
        if (clientConfigIndex >= 0 && clientConfigIndex + 1 < parts.length) {
            return parts.slice(clientConfigIndex + 1).join('/');
        }
        return '';
    }

    /**
     * Set the current file being processed
     */
    public setCurrentFile(file: string) {
        this.currentFile = file;
    }

    /**
     * Set the current namespace being processed
     */
    public setCurrentNamespace(namespace: string) {
        this.currentNamespace = namespace;
    }

    private generateImport(sourceClassName: string, sourceDirectory: string, sourceFile: string, targetClassName: string, currentDir: string = ''): string {
        logger2.info('Generating import:', {
            sourceClassName,
            sourceDirectory,
            sourceFile,
            targetClassName,
            currentDir,
            currentFile: this.currentFile
        });

        // Skip importing List<primitive> types
        const genericMatch = sourceClassName.match(/^(List|IList|IEnumerable|ICollection|HashSet)<(.+)>$/);
        if (genericMatch) {
            const [_, genericType, innerType] = genericMatch;
            const primitiveTypes = ['string', 'bool', 'int', 'long', 'double', 'decimal', 'DateTime', 'Guid', 'object'];
            if (primitiveTypes.includes(innerType)) {
                return '';
            }
        }

        // If sourceDirectory is empty, try to get it from the type registry
        if (!sourceDirectory) {
            const typeInfo = this.findTypeInfo(sourceClassName);
            sourceDirectory = typeInfo.directory;
            logger2.info('Got directory from type registry:', { sourceClassName, sourceDirectory });
        }
        
        // Get the root models directory path
        const rootModelsDir = path.join(this.fileService.getOutputDir(), 'infrastructure', 'models');
        
        // Check if we're importing into a file in the root models directory
        const isImportingIntoRootDir = currentDir === 'infrastructure/models';
        
        logger2.info('Directory analysis:', {
            rootModelsDir,
            currentDir,
            isImportingIntoRootDir,
            sourceDirectory,
            targetClassName
        });
        
        let relativePath;
        
        // First check if we're importing into a file in the root directory (e.g. Settings.ts)
        if (isImportingIntoRootDir) {
            // For root directory imports, always use the source directory if it exists
            relativePath = sourceDirectory ? `./${sourceDirectory}/${sourceClassName}` : `./${sourceClassName}`;
            logger2.info('Importing into root directory:', { relativePath });
            return `import { ${sourceClassName} } from '${relativePath}';`;
        } else {
            // Check if we're importing from the same directory as the current file
            const currentDirParts = currentDir.split(path.sep).filter(Boolean);
            const targetDir = currentDirParts[currentDirParts.length - 1];
            const isSameDirectory = sourceDirectory === targetDir;
            
            logger2.info('Directory comparison:', {
                currentDir,
                sourceDirectory,
                targetDir,
                isSameDirectory
            });
            
            // If we're in the same directory, use a relative import with ./
            if (isSameDirectory) {
                relativePath = `./${sourceClassName}`;
            } else {
                // Calculate how many directories we need to go up
                const currentDirDepth = currentDirParts.length - 2; // Subtract 2 for infrastructure/models
                
                // If we're in the root models directory, no need to go up
                if (currentDirDepth <= 0) {
                    relativePath = sourceDirectory ? `./${sourceDirectory}/${sourceClassName}` : `./${sourceClassName}`;
                } else {
                    // Generate the correct number of '../' to get to the root
                    const upPath = Array(currentDirDepth).fill('..').join('/');
                    
                    // If we're in a subdirectory and importing from another location,
                    // we need to go up to the root models directory
                    if (sourceDirectory) {
                        relativePath = `${upPath}/${sourceDirectory}/${sourceClassName}`;
                    } else {
                        relativePath = `${upPath}/${sourceClassName}`;
                    }
                }
            }
        }
        
        logger2.info('Final import path:', {
            relativePath,
            isImportingIntoRootDir,
            currentDir,
            sourceDirectory,
            sourceClassName,
            targetClassName,
            currentNamespace: this.currentNamespace
        });

        return sourceClassName ? `import { ${sourceClassName} } from '${relativePath}';` : '';
    }

    private getTypeForValue(value: any): string {
        if (value === null) {
            return 'null';
        }

        if (Array.isArray(value)) {
            if (value.length === 0) {
                return 'any[]';
            }
            
            // Check if array contains mixed types
            const valueTypes = value.map(item => {
                if (item === null) return 'null';
                return typeof item;
            });
            const uniqueTypes = [...new Set(valueTypes)];
            
            if (uniqueTypes.length > 1) {
                // For mixed arrays, default to any[] unless it's a specific case we want to handle
                if (uniqueTypes.every(t => ['string', 'number', 'null'].includes(t))) {
                    return '(string | number | null)[]';
                }
                return 'any[]';
            }

            // Handle arrays of objects
            if (value[0] && typeof value[0] === 'object') {
                // Check if it's a simple object (only has a key property)
                if (Object.keys(value[0]).length === 1 && Object.keys(value[0])[0] === 'key') {
                    return 'object[]';
                }
                const interfaceContent = this.generateObjectInterface(value[0]);
                return `{${interfaceContent}}[]`;
            }

            const elementType = this.getTypeForValue(value[0]);
            return elementType === 'null' ? 'any[]' : `${elementType}[]`;
        }

        if (typeof value === 'object') {
            if (Object.keys(value).length === 0 || 
                (Object.keys(value).length === 1 && Object.keys(value)[0] === 'key')) {
                return 'object';
            }
            const interfaceContent = this.generateObjectInterface(value);
            return `{${interfaceContent}}`;
        }

        return typeof value;
    }

    private generateObjectInterface(obj: any): string {
        if (!obj || Object.keys(obj).length === 0 || 
            (Object.keys(obj).length === 1 && Object.keys(obj)[0] === 'key')) {
            return '[key: string]: any;';
        }

        const properties = Object.entries(obj).map(([key, value]) => {
            const type = this.getTypeForValue(value);
            const propertyName = this.formatPropertyName(key);
            const isNullable = value === null;
            return `${propertyName}: ${isNullable ? `null | ${type}` : type};`;
        });

        return properties.join('\n');
    }

    private formatPropertyName(propertyName: string): string {
        return propertyName.charAt(0).toLowerCase() + propertyName.slice(1);
    }

    private generateTypeFromValue(value: any, indent: string = '', name?: string): string {
        if (value === null || typeof value !== 'object' || Array.isArray(value)) {
            const type = this.getTypeForValue(value);
            return name ? `export type ${name} = ${type};\n` : type;
        }

        const interfaceContent = `{\n${Object.entries(value).map(([key, val]) => {
            const type = this.getTypeForValue(val);
            const propName = this.formatPropertyName(key);
            const isNullable = val === null;
            return `${indent}    ${propName}: ${isNullable ? `null | ${type}` : type};`;
        }).join('\n')}\n${indent}}`;

        return name ? `export interface ${name} ${interfaceContent}\n` : interfaceContent;
    }

    private isJsonField(field: ParsedField): boolean {
        return field.documentation?.includes('```json') || 
               field.type.toLowerCase().includes('json');
    }

    private generateSettingField(field: ParsedField): string {
        let code = '';
        const fieldName = field.name.charAt(0).toLowerCase() + field.name.slice(1);
        
        // Add documentation
        if (field.documentation) {
            code += '    /**\n';
            code += field.documentation.split('\n')
                .map(line => `     * ${line}`)
                .join('\n');
            code += '\n     */\n';
        }

        // For JSON fields, create an instance of the helper class
        if (this.isJsonField(field)) {
            const className = `${field.name}Setting`;
            code += `    private readonly _${fieldName} = new ${className}();\n\n`;
            code += `    get ${fieldName}(): ${field.name}Config {\n`;
            code += `        return this._${fieldName}.value;\n`;
            code += '    }\n\n';
            code += `    set ${fieldName}(value: ${field.name}Config) {\n`;
            code += `        this._${fieldName}.value = value;\n`;
            code += '    }\n\n';
        } else {
            // For simple types, use direct field storage
            const tsType = this.mapCSharpTypeToTypeScript(field.type);
            code += `    private _${fieldName}: ${tsType}${field.isNullable ? ' | null' : ''};\n\n`;
            code += `    get ${fieldName}(): ${tsType}${field.isNullable ? ' | null' : ''} {\n`;
            code += `        return this._${fieldName};\n`;
            code += '    }\n\n';
            code += `    set ${fieldName}(value: ${tsType}${field.isNullable ? ' | null' : ''}) {\n`;
            code += `        this._${fieldName} = value;\n`;
            code += '    }\n\n';
        }

        return code;
    }
}
