import logger from '../../utils/logger';

export class TypeMapper {
    private typeRegistry: Map<string, { namespace: string; directory: string; typeName: string }> = new Map();
    private currentFile = '';
    private currentNamespace = '';
    private static readonly typeMap: Map<string, string> = new Map<string, string>([
        ['string', 'string'],
        ['int', 'number'],
        ['long', 'number'],
        ['float', 'number'],
        ['double', 'number'],
        ['decimal', 'number'],
        ['bool', 'boolean'],
        ['DateTime', 'Date'],
        ['Guid', 'string'],
        ['object', 'any'],
        ['dynamic', 'any'],
        ['var', 'any']
    ]);

    constructor() {
        // No initialization needed since typeMap is static
    }

    private initializeTypeMap() {
        // C# primitive types to TypeScript types
        // this.typeMap.set('string', 'string');
        // this.typeMap.set('int', 'number');
        // this.typeMap.set('long', 'number');
        // this.typeMap.set('float', 'number');
        // this.typeMap.set('double', 'number');
        // this.typeMap.set('decimal', 'number');
        // this.typeMap.set('bool', 'boolean');
        // this.typeMap.set('DateTime', 'Date');
        // this.typeMap.set('Guid', 'string');
        // this.typeMap.set('object', 'any');
        // this.typeMap.set('dynamic', 'any');
        // this.typeMap.set('var', 'any');
    }

    /**
     * Map C# types to TypeScript types
     */
    public static mapCSharpTypeToTypeScript(typeName: string): string {
        // Remove any markdown links before processing
        typeName = typeName.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

        // Handle nullable types
        if (typeName.endsWith('?')) {
            typeName = typeName.slice(0, -1);
            return `${TypeMapper.mapCSharpTypeToTypeScript(typeName)} | null`;
        }

        // Handle arrays
        if (typeName.endsWith('[]')) {
            typeName = typeName.slice(0, -2);
            return `${TypeMapper.mapCSharpTypeToTypeScript(typeName)}[]`;
        }

        // Handle generic types
        const genericMatch = typeName.match(/^(.*?)<(.+)>$/);
        if (genericMatch) {
            const [, baseType, genericParams] = genericMatch;
            const mappedParams = genericParams.split(',')
                .map(param => TypeMapper.mapCSharpTypeToTypeScript(param.trim()))
                .join(', ');

            // Handle common collection types
            switch (baseType.trim()) {
                case 'List':
                case 'IList':
                case 'IEnumerable':
                case 'ICollection':
                case 'HashSet':
                case 'Array':
                    // For List<T> and similar types, return T[]
                    return `${mappedParams}[]`;
                case 'Dictionary':
                case 'IDictionary': {
                    const [keyType, valueType] = mappedParams.split(',').map(t => t.trim());
                    return TypeMapper.mapDictionaryType(keyType, valueType);
                }
                default:
                    return `${TypeMapper.mapCSharpTypeToTypeScript(baseType)}<${mappedParams}>`;
            }
        }

        // Map primitive types
        switch (typeName.toLowerCase()) {
            case 'string':
            case 'char':
                return 'string';
            case 'bool':
            case 'boolean':
                return 'boolean';
            case 'byte':
            case 'sbyte':
            case 'short':
            case 'ushort':
            case 'int':
            case 'uint':
            case 'long':
            case 'ulong':
            case 'float':
            case 'double':
            case 'decimal':
                return 'number';
            case 'object':
            case 'dynamic':
                return 'any';
            case 'void':
                return 'void';
            case 'datetime':
            case 'datetimeoffset':
                return 'Date';
            case 'timespan':
            case 'guid':
                return 'string';
            default:
                // For non-primitive types, check if we have it registered
                const instance = new TypeMapper();
                const typeInfo = instance.findTypeInfo(typeName);
                if (typeInfo) {
                    return typeInfo.typeName;
                }
                return typeName;
        }
    }

    public static mapDictionaryType(keyType: string, valueType: string): string {
        // Handle primitive type aliases
        const mappedKeyType = TypeMapper.typeMap.get(keyType.toLowerCase()) || keyType;
        const mappedValueType = TypeMapper.typeMap.get(valueType.toLowerCase()) || valueType;
        return `Record<${mappedKeyType}, ${mappedValueType}>`;
    }

    /**
     * Clean a type name by removing markdown links and other non-type content
     */
    public static cleanTypeName(typeName: string): string {
        // Remove markdown links, keeping only the text content
        typeName = typeName.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
        
        // Remove any remaining special characters or whitespace
        return typeName.trim();
    }

    public static isCustomType(type: string): boolean {
        const primitiveTypes = ['string', 'number', 'boolean', 'any', 'void', 'null', 'undefined', 'object'];
        const cleanType = type.replace(/\[\]$/, '').replace(/^List<(.+)>$/, '$1');
        return !primitiveTypes.includes(cleanType.toLowerCase());
    }

    public registerType(typeName: string, namespace: string = '', directory: string = ''): void {
        logger.info('Registering type:', { typeName, namespace, directory });
        this.typeRegistry.set(typeName, { namespace, directory, typeName });
    }

    public findTypeInfo(typeName: string): { namespace: string; directory: string; typeName: string } | undefined {
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

    private isBuiltInType(type: string): boolean {
        // Check if the type is already a TypeScript built-in type
        if (['string', 'number', 'boolean', 'any', 'void', 'null', 'undefined'].includes(type)) {
            return true;
        }

        // Check if the type maps to a TypeScript built-in type
        const mappedType = TypeMapper.typeMap.get(type.toLowerCase());
        return mappedType !== undefined && ['string', 'number', 'boolean', 'any', 'void'].includes(mappedType);
    }

    public mapsToBuiltInType(type: string): boolean {
        if (!type) {
            return false;
        }

        // Handle array types (e.g., int[])
        if (type.endsWith('[]')) {
            return this.mapsToBuiltInType(type.slice(0, -2));
        }

        // Handle nullable types (e.g., int?)
        if (type.endsWith('?')) {
            return this.mapsToBuiltInType(type.slice(0, -1));
        }

        // Handle generic types (e.g., List<int>)
        const genericMatch = type.match(/<(.+)>/);
        if (genericMatch) {
            const genericType = genericMatch[1];
            return this.mapsToBuiltInType(genericType);
        }

        // Handle namespace-qualified types (e.g., System.Int32)
        const parts = type.split('.');
        const simpleName = parts[parts.length - 1];

        // Check if the type maps to a TypeScript built-in type
        const mappedType = TypeMapper.typeMap.get(simpleName.toLowerCase());
        return mappedType !== undefined && ['string', 'number', 'boolean', 'any', 'void'].includes(mappedType);
    }

    public setCurrentFile(file: string): void {
        this.currentFile = file;
    }

    public setCurrentNamespace(namespace: string): void {
        this.currentNamespace = namespace;
    }

    public mapType(type: string): string {
        logger.debug('Mapping type:', type);

        if (!type) {
            logger.warn('Empty type provided to mapType');
            return 'any';
        }

        // Check if it's an array type
        if (type.endsWith('[]')) {
            const baseType = type.slice(0, -2);
            return `${this.mapType(baseType)}[]`;
        }

        // Check if it's a generic type
        if (type.includes('<')) {
            const match = type.match(/^([^<]+)<(.+)>$/);
            if (match) {
                const baseType = match[1];
                const typeArgs = match[2].split(',').map(t => this.mapType(t.trim()));
                return `${this.mapType(baseType)}<${typeArgs.join(', ')}>`;
            }
        }

        // Check if it's a nullable type
        if (type.endsWith('?')) {
            const baseType = type.slice(0, -1);
            return `${this.mapType(baseType)} | null`;
        }

        // Look up the type in our map
        const mappedType = TypeMapper.typeMap.get(type);
        if (mappedType) {
            logger.debug('Found mapped type:', { original: type, mapped: mappedType });
            return mappedType;
        }

        // If we don't have a mapping, assume it's a custom type and return as is
        logger.debug('No mapping found for type, using as is:', type);
        return type;
    }
}
