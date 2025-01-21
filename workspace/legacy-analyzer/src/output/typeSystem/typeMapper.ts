import logger from '../../utils/logger';

export class TypeMapper {
    private typeRegistry: Map<string, { namespace: string; directory: string; typeName: string }> = new Map();
    private currentFile = '';
    private currentNamespace = '';

    /**
     * Map C# types to TypeScript types
     */
    public mapCSharpTypeToTypeScript(typeName: string): string {
        // Clean the type name first
        typeName = this.cleanTypeName(typeName);

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

    private mapPrimitiveType(typeName: string): string {
        // Map C# primitive types to TypeScript types
        const typeMap: { [key: string]: string } = {
            'bool': 'boolean',
            'Boolean': 'boolean',
            'byte': 'number',
            'Byte': 'number',
            'sbyte': 'number',
            'SByte': 'number',
            'char': 'string',
            'Char': 'string',
            'decimal': 'number',
            'Decimal': 'number',
            'double': 'number',
            'Double': 'number',
            'float': 'number',
            'Float': 'number',
            'int': 'number',
            'Int32': 'number',
            'uint': 'number',
            'UInt32': 'number',
            'long': 'number',
            'Int64': 'number',
            'ulong': 'number',
            'UInt64': 'number',
            'short': 'number',
            'Int16': 'number',
            'ushort': 'number',
            'UInt16': 'number',
            'string': 'string',
            'String': 'string',
            'object': 'any',
            'Object': 'any',
            'void': 'void',
            'Void': 'void',
            'dynamic': 'any',
            'var': 'any',
            'DateTime': 'Date',
            'DateTimeOffset': 'Date',
            'TimeSpan': 'string',
            'Guid': 'string',
            'Uri': 'string'
        };

        return typeMap[typeName] || typeName;
    }

    private cleanTypeName(type: string): string {
        // Remove markdown-style links and just keep the type name
        const markdownLinkMatch = type.match(/\[(.*?)\]\((.*?)\)/);
        if (markdownLinkMatch) {
            return markdownLinkMatch[1];
        }
        return type;
    }

    public registerType(typeName: string, namespace: string = '', directory: string = ''): void {
        // Clean any markdown links from the namespace and type name
        typeName = this.cleanTypeName(typeName);
        namespace = this.cleanTypeName(namespace);

        logger.info('Registering type:', { typeName, namespace, directory });
        this.typeRegistry.set(typeName, { namespace, directory, typeName });
    }

    public findTypeInfo(typeName: string): { namespace: string; directory: string; typeName: string } | undefined {
        // Clean any markdown links from the type name
        typeName = this.cleanTypeName(typeName);

        logger.info('Looking up type info:', {
            typeName,
            registrySize: this.typeRegistry.size,
            allRegisteredTypes: Array.from(this.typeRegistry.keys())
        });

        const typeInfo = this.typeRegistry.get(typeName);
        if (!typeInfo) {
            logger.warn('Type not found in registry:', { typeName });
            this.registerType(typeName, '', '');
        }
        return typeInfo;
    }

    public isBuiltInType(type: string): boolean {
        const builtInTypes = [
            'string', 'number', 'boolean', 'any', 'void', 'null', 'undefined',
            'Date', 'Array', 'Promise', 'Map', 'Set',
            // C# primitive types that map to TypeScript primitives
            'byte', 'sbyte', 'short', 'ushort', 'int', 'uint', 'long', 'ulong',
            'float', 'double', 'decimal', 'bool', 'char',
            'DateTime', 'DateTimeOffset', 'TimeSpan', 'Guid', 'object', 'dynamic'
        ];
        
        // Handle array types
        if (type.endsWith('[]')) {
            return this.isBuiltInType(type.slice(0, -2));
        }

        // Handle generic types
        const genericMatch = type.match(/^(.*?)<(.+)>$/);
        if (genericMatch) {
            const [, baseType, genericParams] = genericMatch;
            return this.isBuiltInType(baseType) && genericParams.split(',').every(param => this.isBuiltInType(param.trim()));
        }

        return builtInTypes.includes(type);
    }

    public setCurrentFile(file: string): void {
        this.currentFile = file;
    }

    public setCurrentNamespace(namespace: string): void {
        this.currentNamespace = namespace;
    }
}
