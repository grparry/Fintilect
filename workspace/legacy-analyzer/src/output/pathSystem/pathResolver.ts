import path from 'path';
import { ParsedClass, ParsedEnum } from '@/../parser/types';
import logger from '@/../utils/logger';

export interface PathResolverOptions {
    isTest?: boolean;
}

export class PathResolver {
    private readonly isTest: boolean;
    private typeRegistry: Map<string, { namespace: string, directory: string }>;

    constructor(options: PathResolverOptions = {}) {
        this.isTest = options.isTest || false;
        this.typeRegistry = new Map();
    }

    /**
     * Get the output path for a TypeScript type file
     */
    public getTypeOutputPath(parsedClass: ParsedClass | ParsedEnum, importingClass?: ParsedClass): string {
        logger.info('getTypeOutputPath called with:', {
            className: parsedClass.name,
            namespace: parsedClass.namespace,
            importingClass: importingClass?.name,
            isTest: this.isTest
        });
        
        const parts = this.isTest ? ['classes'] : ['infrastructure', 'models'];
        
        if (parsedClass.namespace) {
            const namespaceParts = parsedClass.namespace.split('.');
            
            if (!this.isTest) {
                if (this.isInRootNamespace(namespaceParts) && !this.isInSubNamespace(namespaceParts)) {
                    // Base namespace classes go directly in models directory
                    // No additional parts needed
                } else if (this.isInRootNamespace(namespaceParts)) {
                    // For production with sub-namespaces, use specific subdirectory structure
                    const subDir = this.getSubdirectoryFromNamespace(parsedClass.namespace);
                    if (subDir) {
                        parts.push(subDir);
                    }
                } else {
                    // For non-root namespaces, use namespace hierarchy
                    parts.push(...namespaceParts);
                }
            } else {
                // For tests, always use namespace hierarchy
                parts.push(...namespaceParts);
            }
        }
        
        // Add the class name
        const fileName = `${parsedClass.name}.ts`;
        
        // Join all parts to create the final path
        const fullPath = path.join(...parts, fileName);
        logger.info('Generated TypeScript file path:', { fullPath });
        
        return fullPath;
    }

    private isInRootNamespace(namespaceParts: string[]): boolean {
        return (
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
    }

    private isInSubNamespace(namespaceParts: string[]): boolean {
        // Check if there are additional namespace parts after ClientConfigurationModels
        return namespaceParts.length > (namespaceParts[1] === 'Data' ? 4 : 3);
    }

    /**
     * Extract subdirectory from namespace
     */
    private getSubdirectoryFromNamespace(namespace: string): string {
        const parts = namespace.split('.');
        if (parts.length < 2) return '';
        
        // Remove the root namespace parts and convert to lowercase
        parts.splice(0, parts.length - 1);
        
        return parts.join(path.sep).toLowerCase();
    }

    private cleanTypeName(type: string): string {
        return type.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
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
     * Get the subdirectory path for a type
     */
    private getTypeSubdirectoryPath(type: string): string | null {
        // Special case handling for known subdirectories
        if (type === 'MobileConfiguration') {
            return 'MobileConfigurations';
        }
        // Add more special cases as needed
        return null;
    }

    /**
     * Get the relative import path from one class to another
     */
    public getRelativeImportPath(fromClass: ParsedClass, toTypeName: string): string | null {
        // Clean any markdown-style links from the type name
        const cleanToTypeName = this.cleanTypeName(toTypeName);

        // Check if the type should be in a specific subdirectory
        const subdir = this.getTypeSubdirectoryPath(cleanToTypeName);
        if (subdir) {
            return `./${subdir}/${cleanToTypeName}`;
        }

        // Get the full paths for both files
        const fromPath = this.getTypeOutputPath(fromClass);
        const toClass = { name: cleanToTypeName, namespace: fromClass.namespace } as ParsedClass;
        const toPath = this.getTypeOutputPath(toClass);

        // Convert both paths to use forward slashes for consistency
        const normalizedFromPath = fromPath.replace(/\\/g, '/');
        const normalizedToPath = toPath.replace(/\\/g, '/');

        // Get the directories
        const fromDir = path.dirname(normalizedFromPath);
        const toDir = path.dirname(normalizedToPath);

        // If paths are in the same directory
        if (fromDir === toDir) {
            return `./${cleanToTypeName}`;
        }

        // Handle cross-directory references
        let relativePath = path.relative(fromDir, toDir);
        relativePath = relativePath.replace(/\\/g, '/');

        // Ensure the path starts with ./ or ../
        if (!relativePath.startsWith('.')) {
            relativePath = `./${relativePath}`;
        }

        // Return the final import path
        return `${relativePath}/${cleanToTypeName}`;
    }

    /**
     * Get the relative path for importing a type from another file
     */
    public getRelativePath(currentFile: string, typeName: string): string {
        // For tests, use simple relative path
        if (this.isTest) {
            return `./${typeName}`;
        }

        // Get current file's directory
        const currentDir = path.dirname(currentFile);
        const isInRootDir = !currentDir.split(path.sep).slice(-2, -1)[0] || 
                           currentDir.split(path.sep).slice(-2, -1)[0] === 'models';

        // For imports from root directory files, include the full path
        if (isInRootDir) {
            return `./${typeName}`;
        }

        // For imports within subdirectories, use relative paths
        const typeInfo = this.findTypeInfo(typeName);
        if (!typeInfo) {
            logger.warn(`Type information not found for ${typeName}, using default relative path`);
            return `./${typeName}`;
        }

        if (typeInfo.directory) {
            return `../${typeInfo.directory}/${typeName}`;
        }

        return `./${typeName}`;
    }

    /**
     * Find type information in the registry
     */
    private findTypeInfo(typeName: string): { namespace: string, directory: string } | undefined {
        // For tests, return empty directory
        if (this.isTest) {
            return { namespace: '', directory: '' };
        }

        // Check if type exists in registry
        const typeInfo = this.typeRegistry.get(typeName);
        if (typeInfo) {
            return typeInfo;
        }

        return undefined;
    }

    getImportPath(fromFile: string, toFile: string): string {
        const fromDir = path.dirname(fromFile);
        const toDir = path.dirname(toFile);
        const relativePath = path.relative(fromDir, toDir);
        const toFileName = path.basename(toFile, '.ts');
        return path.join(relativePath === '' ? '.' : relativePath, toFileName).replace(/\\/g, '/');
    }
}
