import path from 'path';
import { ParsedClass, ParsedEnum } from '../../parser/types';
import { Logger } from '../../utils/logger';
import fs from 'fs';

export interface PathResolverOptions {
    isTest?: boolean;
    outputDirectory?: string;
}

export class PathResolver {
    private readonly isTest: boolean;
    private readonly outputDirectory?: string;
    private typeRegistry: Map<string, { namespace: string, directory: string, typeName: string }>;
    private logger = new Logger();

    constructor(options: PathResolverOptions = {}) {
        this.isTest = options.isTest ?? false;
        this.outputDirectory = options.outputDirectory;
        this.typeRegistry = new Map();
    }

    /**
     * Get the output path for a TypeScript type file
     */
    public getTypeOutputPath(parsedClass: ParsedClass | ParsedEnum, importingClass?: ParsedClass): string {
        this.logger.info('getTypeOutputPath called with:', {
            className: parsedClass.name,
            namespace: parsedClass.namespace,
            importingClass: importingClass?.name,
            isTest: this.isTest
        });
        
        const parts = this.isTest ? ['doc'] : [];
        
        if (parsedClass.namespace) {
            const namespaceParts = parsedClass.namespace.split('.');
            
            if (!this.isTest) {
                // Find index of ClientConfigurationModels
                const configIndex = namespaceParts.indexOf('ClientConfigurationModels');
                
                if (configIndex !== -1) {
                    // Add ClientConfigurationModels as base
                    parts.push('ClientConfigurationModels');
                    
                    // Add any remaining parts after ClientConfigurationModels
                    if (configIndex < namespaceParts.length - 1) {
                        // Join remaining parts with forward slashes instead of dots
                        const remainingPath = namespaceParts.slice(configIndex + 1).join('/');
                        if (remainingPath) {
                            parts.push(remainingPath);
                        }
                    }
                } else {
                    // For non-ClientConfigurationModels namespaces, join parts with forward slashes
                    const namespacePath = namespaceParts.join('/');
                    if (namespacePath) {
                        parts.push(namespacePath);
                    }
                }
            } else {
                // For tests, always use namespace hierarchy with forward slashes
                parts.push(namespaceParts.join('/'));
            }
        }
        
        // Add the class name
        const fileName = `${parsedClass.name}.ts`;
        
        // Join all parts to create the final path
        const fullPath = path.join(...parts, fileName);
        this.logger.info('Generated TypeScript file path:', { fullPath });
        
        return fullPath;
    }

    private isInRootNamespace(namespaceParts: string[]): boolean {
        // Check if the namespace contains ClientConfigurationModels
        return namespaceParts.includes('ClientConfigurationModels');
    }

    private isInSubNamespace(namespaceParts: string[]): boolean {
        // Check if there are additional namespace parts after ClientConfigurationModels
        return namespaceParts.length > (namespaceParts[1] === 'Data' ? 4 : 3);
    }
    /**
     * Get the subdirectory path for a type based on its namespace
     */
    private getTypeSubdirectoryPath(fromClassOrType: ParsedClass | string, namespace?: string): string {
        const typeName = typeof fromClassOrType === 'string' ? fromClassOrType : fromClassOrType.name;
        const typeNamespace = namespace || (fromClassOrType as ParsedClass).namespace;

        this.logger.debug('Getting type subdirectory path for:', { typeName, namespace: typeNamespace });
        
        // Check if type exists in registry first
        const typeInfo = this.getTypeInfo(typeName);
        if (typeInfo) {
            this.logger.debug('Found type in registry:', typeInfo);
            return typeInfo.directory;
        }

        // Otherwise calculate the subdirectory path
        if (!typeNamespace) {
            this.logger.debug('No namespace found, returning empty string');
            return '';
        }

        this.logger.debug('Calculating subdirectory from namespace:', typeNamespace);
        const parts = typeNamespace.split('.');
        const configIndex = parts.indexOf('ClientConfigurationModels');
        
        // If we find ClientConfigurationModels and it's not the last part
        if (configIndex !== -1) {
            // If it's the last part, return empty string (root type)
            if (configIndex === parts.length - 1) {
                this.logger.debug('Found root ClientConfigurationModels type');
                this.registerType(typeName, typeNamespace, '');
                return '';
            }
            
            // Otherwise get subdirectory parts after ClientConfigurationModels
            const subDirParts = parts.slice(configIndex + 1);
            const subDir = subDirParts.join('/');
            
            this.logger.debug('Found subdirectory parts:', subDirParts);
            this.logger.debug('Calculated subdirectory:', subDir);
            
            // Register for future use
            this.registerType(typeName, typeNamespace, subDir);
            
            return subDir;
        }
        
        // If no subdirectory found, return empty string
        this.logger.debug('No subdirectory found, returning empty string');
        return '';
    }

    /**
     * Get the full directory path from a namespace
     */
    private getFullDirectoryPath(namespace: string | undefined): string {
        if (!namespace) {
            return '';
        }

        const namespaceParts = namespace.split('.');
        const configIndex = namespaceParts.indexOf('ClientConfigurationModels');
        
        if (configIndex === -1) {
            // Not in ClientConfigurationModels namespace
            return '';
        }

        // Get only the parts after ClientConfigurationModels
        const pathParts = namespaceParts.slice(configIndex + 1);
        
        // Filter out empty parts and join with forward slashes
        return pathParts.filter(Boolean).join('/');
    }

    /**
     * Register a type with its full path information
     */
    private registerType(typeName: string, namespace: string, directory: string): void {
        // Always store the full directory path
        this.logger.debug('Registering type:', {
            typeName,
            namespace,
            directory
        });

        this.typeRegistry.set(typeName, {
            namespace,
            directory,
            typeName
        });
    }

    /**
     * Check if a path is in the root models directory
     */
    private isInRootModelsDirectory(filePath: string): boolean {
        const parts = filePath.split(path.sep);
        const modelsIndex = parts.indexOf('models');
        if (modelsIndex === -1) return false;
        
        // Check if there are any additional subdirectories after 'models'
        // infrastructure/models/file.ts -> true
        // infrastructure/models/subdirectory/file.ts -> false
        return parts.length === modelsIndex + 2;
    }

    /**
     * Get the target namespace for an import based on type patterns
     */
    private getTargetNamespace(fromNamespace: string | undefined, typeName: string): string {
        if (!fromNamespace) {
            return '';
        }

        // Extract the base namespace and subdirectory parts
        const parts = fromNamespace.split('.');
        const configIndex = parts.indexOf('ClientConfigurationModels');
        if (configIndex === -1) {
            return fromNamespace;
        }

        // Get everything up to and including ClientConfigurationModels
        const baseNamespace = parts.slice(0, configIndex + 1).join('.');

        // For compound types (e.g., Institution.MFAQuestions), use the first part as subdirectory
        if (typeName.includes('.')) {
            const [parentType] = typeName.split('.');
            return `${baseNamespace}.${parentType}`;
        }

        // Get the current subdirectory from the namespace
        const currentSubDir = parts[configIndex + 1];

        // If we're in a subdirectory and the type name doesn't match the subdirectory pattern,
        // keep it in the same namespace as the source file
        if (currentSubDir) {
            return fromNamespace;
        }

        // Keep the type in its original namespace
        return fromNamespace;
    }

    private typeMatchesSubdirectory(typeName: string, subDir: string): boolean {
        // A type matches a subdirectory if:
        // 1. The subdirectory starts with the type name (e.g., PaydayLoan matches PaydayLoans)
        // 2. The type name starts with the subdirectory without trailing 's' (e.g., PaydayLoan matches PaydayLoans)
        return subDir.startsWith(typeName) || typeName.startsWith(subDir.replace(/s$/, ''));
    }

    private isValidSubdirectory(subDir: string): boolean {
        // In a real implementation, this would check against actual directory structure
        // For now, we'll use a simple check based on the type name pattern
        return /^[A-Z][a-zA-Z]*s$/.test(subDir);
    }

    private getPathParts(subDir: string | undefined): string[] {
        const parts = !subDir ? [] : subDir.split('/').filter(part => part.length > 0);
        this.logger.debug('getPathParts:', {
            input: subDir,
            filtered: parts
        });
        return parts;
    }

    private getCommonPrefixLength(fromParts: string[], toParts: string[]): number {
        let i = 0;
        const maxLength = Math.min(fromParts.length, toParts.length);
        while (i < maxLength && fromParts[i] === toParts[i]) {
            i++;
        }
        this.logger.debug('getCommonPrefixLength:', {
            fromParts,
            toParts,
            maxLength,
            commonLength: i
        });
        return i;
    }

    private calculateUpPath(fromParts: string[], commonPrefixLength: number): string {
        const upCount = fromParts.length - commonPrefixLength;
        const upPath = upCount > 0 ? '../'.repeat(upCount) : './';
        this.logger.debug('calculateUpPath:', {
            fromParts,
            commonPrefixLength,
            upCount,
            upPath
        });
        return upPath;
    }

    private calculateDownPath(toParts: string[], commonPrefixLength: number): string {
        const remainingParts = toParts.slice(commonPrefixLength);
        const downPath = remainingParts.join('/');
        this.logger.debug('calculateDownPath:', {
            toParts,
            commonPrefixLength,
            remainingParts,
            downPath
        });
        return downPath;
    }

    private buildFinalPath(upPath: string, downPath: string, targetTypeName: string): string {
        const finalPath = downPath.length > 0 
            ? `${upPath}${downPath}/${targetTypeName}`
            : `${upPath}${targetTypeName}`;
            
        this.logger.debug('buildFinalPath:', {
            upPath,
            downPath,
            targetTypeName,
            finalPath
        });
        return finalPath;
    }

    private calculateRelativePath(fromSubDir: string, toSubDir: string, targetTypeName: string, fromClass: ParsedClass, toClass: ParsedClass): string {
        this.logger.debug('calculateRelativePath - input:', {
            fromSubDir,
            toSubDir,
            targetTypeName,
            typeRegistry: Array.from(this.typeRegistry.entries()).map(([key, value]) => ({
                key,
                value: {
                    namespace: value.namespace,
                    directory: value.directory,
                    typeName: value.typeName
                }
            })),
            fromClass: fromClass.name,
            toClass: toClass.name
        });

        // Handle empty strings as root directory
        fromSubDir = fromSubDir || '';
        toSubDir = toSubDir || '';

        const fromParts = fromSubDir ? fromSubDir.split('/').filter(Boolean) : [];
        const toParts = toSubDir ? toSubDir.split('/').filter(Boolean) : [];

        this.logger.debug('calculateRelativePath - parsed parts:', {
            fromParts,
            toParts
        });

        // If both paths are empty, they're in the root directory
        if (fromParts.length === 0 && toParts.length === 0) {
            const result = `./${targetTypeName}`;
            this.logger.debug('calculateRelativePath - both in root:', { result });
            return result;
        }

        // If source is in root but target is in subdirectory
        if (!fromSubDir && toSubDir) {
            const result = `./${toSubDir}/${targetTypeName}`;
            this.logger.debug('calculateRelativePath - source in root:', { 
                fromSubDir,
                toSubDir,
                result,
                fromNamespace: fromClass.namespace,
                toNamespace: toClass.namespace
            });
            return result;
        }

        // If source is in subdirectory but target is in root
        if (fromSubDir && !toSubDir) {
            const upCount = fromParts.length;
            const result = `${'../'.repeat(upCount)}${targetTypeName}`;
            this.logger.debug('calculateRelativePath - target in root:', {
                fromSubDir,
                toSubDir,
                upCount,
                result,
                fromNamespace: fromClass.namespace,
                toNamespace: toClass.namespace
            });
            return result;
        }

        // Both are in subdirectories
        if (fromSubDir === toSubDir) {
            // Same subdirectory - use relative path within the directory
            const result = `./${targetTypeName}`;
            this.logger.debug('Both in same subdirectory:', { result });
            return result;
        } else {
            // Different subdirectories
            // Calculate the relative path by going up from source and then down to target
            const sourceParts = fromSubDir.split('/');
            const targetParts = toSubDir.split('/');
            
            // Find common prefix length
            const commonPrefixLength = this.getCommonPrefixLength(sourceParts, targetParts);
            
            this.logger.debug('Different subdirectories analysis:', {
                sourceParts,
                targetParts,
                commonPrefixLength
            });
            
            // Calculate up path from source
            const upPath = '../'.repeat(sourceParts.length - commonPrefixLength);
            
            // Calculate down path to target
            const downPath = targetParts.slice(commonPrefixLength).join('/');
            
            // Build final path
            if (!downPath) {
                const result = `${upPath}${targetTypeName}`;
                this.logger.debug('No down path needed:', { result });
                return result;
            }
            
            // Include the target subdirectory name in the path
            const result = `${upPath}${toSubDir}/${targetTypeName}`;
            this.logger.debug('Including target subdirectory:', { result });
            return result;
        }
    }

    private calculateRelativePathOld(fromSubDir: string, toSubDir: string, targetTypeName: string): string {
        this.logger.debug('Calculating relative path:', {
            fromSubDir,
            toSubDir,
            targetTypeName,
            typeRegistry: Array.from(this.typeRegistry.entries()).map(([key, value]) => ({
                key,
                value: {
                    namespace: value.namespace,
                    directory: value.directory,
                    typeName: value.typeName
                }
            }))
        });

        // If both are in the root directory (no subdirectory)
        if (!fromSubDir && !toSubDir) {
            return `./${targetTypeName}`;
        }

        // If source is in root but target is in subdirectory
        if (!fromSubDir && toSubDir) {
            return `./${toSubDir}/${targetTypeName}`;
        }

        // If source is in subdirectory but target is in root
        if (fromSubDir && !toSubDir) {
            return `../${targetTypeName}`;
        }

        // Both are in subdirectories
        if (fromSubDir === toSubDir) {
            // Same subdirectory
            return `./${targetTypeName}`;
        } else {
            // Different subdirectories
            const sourceParts = fromSubDir.split('/');
            const targetParts = toSubDir.split('/');
            
            // Find common prefix length
            const commonPrefixLength = this.getCommonPrefixLength(sourceParts, targetParts);
            
            // Calculate up path from source
            const upPath = '../'.repeat(sourceParts.length - commonPrefixLength);
            
            // Calculate down path to target
            const downPath = targetParts.slice(commonPrefixLength).join('/');
            
            // Build final path
            if (!downPath) {
                return `${upPath}${targetTypeName}`;
            }
            
            // Include the target subdirectory name in the path
            if (toSubDir.includes('/')) {
                // For deeply nested paths, use the full path
                return `${upPath}${toSubDir}/${targetTypeName}`;
            } else {
                // For single level subdirectories
                return `${upPath}${toSubDir}/${targetTypeName}`;
            }
        }
    }

    private resolveSourcePath(fromClass: ParsedClass): { namespace: string, subDir: string } {
        const namespace = fromClass.namespace;
        
        // Get subdirectory path and strip ClientConfigurationModels prefix if present
        let subDir = fromClass.outputDirectory || '';
        subDir = subDir.replace(/^ClientConfigurationModels\/?/, '');
        
        // Register the source class in the type registry
        this.registerType(fromClass.name, namespace, subDir);

        this.logger.info('=== TYPE REGISTRY AFTER RESOLVE SOURCE PATH ===', {
            className: fromClass.name,
            namespace,
            subDir,
            typeRegistryAfterSource: Array.from(this.typeRegistry.entries()).map(([key, value]) => ({
                key,
                value: {
                    namespace: value.namespace,
                    directory: value.directory,
                    typeName: value.typeName
                }
            }))
        });

        return { namespace, subDir };
    }

    /**
     * Resolve the target path components
     */
    private resolveTargetPath(fromNamespace: string, toClass: ParsedClass): { namespace: string, subDir: string, typeName: string } {
        this.logger.info('=== START resolveTargetPath ===', {
            fromNamespace,
            toClass: {
                name: toClass.name,
                namespace: toClass.namespace,
                outputDirectory: toClass.outputDirectory,
                type: toClass.type
            }
        });
        
        // Check if type exists in registry
        const typeInfo = this.getTypeInfo(toClass.name);
        if (typeInfo) {
            this.logger.info('Found existing type in registry:', {
                typeName: toClass.name,
                registryInfo: typeInfo
            });
            return {
                namespace: typeInfo.namespace,
                subDir: typeInfo.directory,
                typeName: typeInfo.typeName
            };
        }

        this.logger.info('Type not found in registry, checking output directory');

        // If type not found in registry, use its output directory
        let subDir = toClass.outputDirectory || '';
        if (!subDir) {
            const fullPath = this.getTypeOutputPath(toClass);
            // Remove ClientConfigurationModels prefix and convert dots to slashes
            subDir = path.dirname(fullPath)
                .replace(/^ClientConfigurationModels\/?/, '')
                .replace(/\./g, '/');
        }

        // Register the type with its namespace and directory
        this.registerType(toClass.name, toClass.namespace, subDir);
        
        const result = { 
            namespace: toClass.namespace, 
            subDir, 
            typeName: toClass.name 
        };
        
        this.logger.info('Resolved target path with output directory:', result);
        return result;
    }

    public getRelativeImportPath(fromClass: ParsedClass, toClass: ParsedClass): string {
        this.logger.info('Starting getRelativeImportPath:', {
            fromClass: {
                name: fromClass.name,
                namespace: fromClass.namespace,
                subDir: this.getTypeSubdirectoryPath(fromClass),
                fullPath: this.getTypeOutputPath(fromClass)
            },
            toClass: {
                name: toClass.name,
                namespace: toClass.namespace,
                outputDirectory: toClass.outputDirectory
            },
            typeRegistryState: [...this.typeRegistry.entries()]
        });

        // Get source path components
        const { namespace: sourceNamespace, subDir: initialSourceSubDir } = this.resolveSourcePath(fromClass);
        
        this.logger.info('=== TYPE REGISTRY AFTER RESOLVE SOURCE PATH ===', {
            sourceNamespace,
            sourceSubDir: initialSourceSubDir,
            typeRegistryAfterSource: Array.from(this.typeRegistry.entries()).map(([key, value]) => ({
                key,
                value: {
                    namespace: value.namespace,
                    directory: value.directory,
                    typeName: value.typeName
                }
            }))
        });

        // Use the cleaned paths from toClass
        let targetSubDir = toClass.outputDirectory || '';
        let cleanTypeName = toClass.name;

        // Clean markdown-style links from type names
        cleanTypeName = cleanTypeName.replace(/\[(.*?)\](?:\(.*?\))?/g, '$1');

        // Remove ClientConfigurationModels prefix from both source and target paths
        let sourceSubDir = initialSourceSubDir.replace(/^ClientConfigurationModels\/?/, '');
        targetSubDir = targetSubDir.replace(/^ClientConfigurationModels\/?/, '');

        this.logger.debug('Using cleaned paths:', {
            sourceSubDir,
            targetSubDir,
            cleanTypeName,
            toClass
        });

        // Split the source and target subdirectories into parts, filtering out empty segments
        const sourceParts = sourceSubDir ? sourceSubDir.split('/').filter(Boolean) : [];
        const targetParts = targetSubDir ? targetSubDir.split('/').filter(Boolean) : [];

        this.logger.debug('Path components:', {
            sourceParts,
            targetParts,
            cleanTypeName
        });

        // Both in root directory
        if (sourceParts.length === 0 && targetParts.length === 0) {
            const result = `./${cleanTypeName}`;
            this.logger.debug('Both in root directory:', { result });
            return result;
        }

        // Source in root, target in subdirectory
        if (sourceParts.length === 0 && targetParts.length > 0) {
            const result = `./${targetParts.join('/')}/${cleanTypeName}`;
            this.logger.debug('Source in root, target in subdirectory:', { 
                sourceParts,
                targetParts,
                cleanTypeName,
                targetSubDir,
                result,
                fromClass: {
                    name: fromClass.name,
                    namespace: fromClass.namespace
                },
                toClass: {
                    name: toClass.name,
                    namespace: toClass.namespace
                }
            });
            return result;
        }

        // Source in subdirectory, target in root
        if (sourceParts.length > 0 && targetParts.length === 0) {
            const upCount = sourceParts.length;
            const result = `${'../'.repeat(upCount)}${cleanTypeName}`;
            this.logger.debug('Source in subdirectory, target in root:', {
                sourceParts,
                targetParts,
                upCount,
                cleanTypeName,
                targetSubDir,
                result,
                fromClass: {
                    name: fromClass.name,
                    namespace: fromClass.namespace
                },
                toClass: {
                    name: toClass.name,
                    namespace: toClass.namespace
                }
            });
            return result;
        }

        // Both in same subdirectory
        if (sourceParts.join('/') === targetParts.join('/')) {
            const result = `./${cleanTypeName}`;
            this.logger.debug('Both in same subdirectory:', { result });
            return result;
        }

        // Find common prefix length
        let commonPrefixLength = 0;
        const minLength = Math.min(sourceParts.length, targetParts.length);
        while (commonPrefixLength < minLength && sourceParts[commonPrefixLength] === targetParts[commonPrefixLength]) {
            commonPrefixLength++;
        }

        // Calculate up path from source to common ancestor
        const upCount = sourceParts.length - commonPrefixLength;
        const upPath = upCount > 0 ? '../'.repeat(upCount) : './';

        // Calculate down path from common ancestor to target
        const downPath = targetParts.slice(commonPrefixLength).join('/');

        // Construct final path
        const result = `${upPath}${downPath ? `${downPath}/` : ''}${cleanTypeName}`;
        
        this.logger.debug('Different subdirectories:', {
            sourceParts,
            targetParts,
            commonPrefixLength,
            upCount,
            upPath,
            downPath,
            result
        });

        return result;
    }

    /**
     * Get the relative path for importing a type from another file
     */
    public getRelativePath(fromClass: ParsedClass, toClass: ParsedClass): string {
        const { namespace: sourceNamespace } = this.resolveSourcePath(fromClass);
        const { namespace: targetNamespace, subDir, typeName } = this.resolveTargetPath(sourceNamespace, toClass);

        this.logger.debug('getRelativePath inputs:', {
            fromClass,
            toClass,
            resolvedTarget: { targetNamespace, subDir, typeName }
        });

        // Get source and target paths
        const sourcePath = this.getTypeSubdirectoryPath(fromClass);
        const targetPath = this.getTypeSubdirectoryPath(toClass);

        this.logger.debug('Resolved paths:', {
            sourcePath,
            targetPath
        });

        // Handle root level imports
        if (!sourcePath && !targetPath) {
            this.logger.debug('Root level import - using simple path');
            return `./${typeName}`;
        }

        // Split paths into parts for comparison
        const sourceParts = sourcePath ? sourcePath.split('/') : [];
        const targetParts = targetPath ? targetPath.split('/') : [];

        this.logger.debug('Path comparison:', {
            sourceParts,
            targetParts,
            typeName
        });

        // Find common prefix length
        let commonPrefixLength = 0;
        while (commonPrefixLength < Math.min(sourceParts.length, targetParts.length) &&
               sourceParts[commonPrefixLength] === targetParts[commonPrefixLength]) {
            commonPrefixLength++;
        }

        this.logger.debug('Path comparison:', {
            sourceParts,
            targetParts,
            commonPrefixLength
        });

        // Calculate up path (how many levels to go up)
        const upLevels = Math.max(0, sourceParts.length - commonPrefixLength);
        const upPath = upLevels > 0 ? '../'.repeat(upLevels) : './';

        // Calculate down path to target
        const downParts = targetParts.slice(commonPrefixLength);
        const downPath = downParts.length > 0 ? downParts.join('/') + '/' : '';

        const finalPath = `${upPath}${downPath}${typeName}`;
        this.logger.debug('Final path components:', {
            upLevels,
            upPath,
            downParts,
            downPath,
            finalPath
        });

        return finalPath;
    }

    /**
     * Get the type information from registry
     */
    private getTypeInfo(typeName: string): { namespace: string, directory: string, typeName: string } | undefined {
        const type = this.typeRegistry.get(typeName);
        this.logger.debug('Looking up type info:', { typeName, found: !!type });
        return type;
    }

    getImportPath(fromFile: string, toFile: string): string {
        const fromDir = path.dirname(fromFile);
        const toDir = path.dirname(toFile);
        const relativePath = path.relative(fromDir, toDir);
        const toFileName = path.basename(toFile, '.ts');
        return path.join(relativePath === '' ? '.' : relativePath, toFileName).replace(/\\/g, '/');
    }
}
