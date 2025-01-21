import path from 'path';
import { ParsedClass, ParsedEnum } from '../../parser/csharpParser';
import logger from '../../utils/logger';

export interface PathResolverOptions {
    isTest?: boolean;
}

export class PathResolver {
    private readonly isTest: boolean;

    constructor(options: PathResolverOptions = {}) {
        this.isTest = options.isTest || false;
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
        
        const namespace = this.cleanMarkdownPath(parsedClass.namespace);

        const parts = this.isTest ? ['classes'] : ['infrastructure', 'models'];
        
        if (namespace) {
            const namespaceParts = namespace.split('.');
            
            if (!this.isTest) {
                if (this.isInRootNamespace(namespaceParts) && !this.isInSubNamespace(namespaceParts)) {
                    // Base namespace classes go directly in models directory
                    // No additional parts needed
                } else if (this.isInRootNamespace(namespaceParts)) {
                    // For production with sub-namespaces, use specific subdirectory structure
                    const subDir = this.getSubdirectoryFromNamespace(namespace);
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

    /**
     * Get the relative import path between two files
     */
    public getRelativeImportPath(fromFile: string, toFile: string): string {
        // Clean any markdown links from the paths
        fromFile = this.cleanMarkdownPath(fromFile);
        toFile = this.cleanMarkdownPath(toFile);

        // Get the directory paths
        const fromDir = path.dirname(fromFile);
        const toDir = path.dirname(toFile);

        // Get the relative path
        let relativePath = path.relative(fromDir, toDir);

        // If we're in the same directory, use './'
        if (!relativePath) {
            relativePath = '.';
        }
        // If the path doesn't start with . or .., add ./
        else if (!relativePath.startsWith('.')) {
            relativePath = './' + relativePath;
        }

        // Get the filename without extension
        const toFileName = path.basename(toFile, '.ts');

        // Combine the path and filename
        return path.join(relativePath, toFileName).replace(/\\/g, '/');
    }

    private cleanMarkdownPath(filePath: string): string {
        // Remove markdown-style links and just keep the path
        const markdownLinkMatch = filePath.match(/\[(.*?)\]\((.*?)\)/);
        if (markdownLinkMatch) {
            return markdownLinkMatch[2];
        }
        return filePath;
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
}
