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

    /**
     * Generate import statement for a type
     * @param sourceClassName The name of the class being imported
     * @param sourceDirectory The directory of the class being imported
     * @param sourceFile The TypeScript file of the class being imported
     * @param targetClassName The name of the class we're adding the import to
     * @param currentDir The current directory relative to root models
     */
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
}
