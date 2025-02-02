# Settings Type Generation Enhancement Plan

## Overview
This document outlines the plan to enhance the settings type generation to include full JSON schema metadata, enabling transparent serialization/deserialization and type-safe configuration management.

## Current State
- Basic TypeScript interfaces are generated from C# models
- JSON fields are typed as strings without schema information
- XML comments containing JSON examples are not utilized
- Key paths from `SettingKey` attributes are not preserved

## Required Changes

### 1. JSON Schema Extraction
Update `SettingsGenerator` to extract JSON schemas from XML comments:

```typescript
interface JsonSchemaInfo {
    schema: JsonSchema;
    example: string;
    description: string;
}

class SettingsGenerator {
    private extractJsonSchema(field: ParsedField): JsonSchemaInfo | undefined {
        const remarks = field.attributes.find(a => a.name === 'remarks')?.value;
        const description = field.attributes.find(a => a.name === 'summary')?.value;
        
        if (remarks) {
            try {
                const example = JSON.parse(remarks);
                return {
                    schema: this.jsonGenerator.generateSchemaFromExample(example),
                    example: remarks,
                    description: description || ''
                };
            } catch (e) {
                logger.warn(`Failed to parse JSON example for ${field.name}`);
            }
        }
        return undefined;
    }
}
```

### 2. Schema Generation
Enhance `JsonGenerator` to generate JSON schemas from examples:

```typescript
class JsonGenerator {
    public generateSchemaFromExample(example: any): JsonSchema {
        const schema = {
            type: this.getJsonType(example),
            properties: {},
            required: []
        };
        
        if (Array.isArray(example)) {
            schema.items = this.generateTypeFromValue(example[0]);
        } else {
            for (const [key, value] of Object.entries(example)) {
                schema.properties[key] = this.generateTypeFromValue(value);
                if (this.isRequired(value)) {
                    schema.required.push(key);
                }
            }
        }
        
        return schema;
    }

    private getJsonType(value: any): string {
        if (Array.isArray(value)) return 'array';
        if (value === null) return 'null';
        if (typeof value === 'object') return 'object';
        return typeof value;
    }
}
```

### 3. Key Path Preservation
Update settings generation to include key paths from attributes:

```typescript
interface SettingsMetadata {
    groupName: string;
    keyPaths: Record<string, string>;
    schemas: Record<string, JsonSchema>;
}

class SettingsGenerator {
    private extractKeyPath(field: ParsedField): string | undefined {
        return field.attributes
            .find(a => a.name === 'SettingKey')
            ?.value
            ?.replace(/['"]/g, '');
    }
}
```

### 4. Enhanced Type Generation
Generate richer TypeScript interfaces with metadata:

```typescript
// Generated output example
export interface FilterConfig {
    Name: string;
    ValuesCausingInclusion: string;
    ValuesCausingExclusion: string;
    RequiresValue: boolean;
    ErrorMessage: string;
}

export class PscuLogFileTransformServiceSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PscuLogFileTransformServiceSettings',
        keyPaths: {
            filters: 'PsiServices.PscuLogFileTransformService.Filters'
        },
        schemas: {
            filters: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        Name: { type: 'string' },
                        ValuesCausingInclusion: { type: 'string' },
                        ValuesCausingExclusion: { type: 'string' },
                        RequiresValue: { type: 'boolean' },
                        ErrorMessage: { type: 'string' }
                    },
                    required: ['Name', 'RequiresValue']
                }
            }
        }
    };

    // Type-safe accessors
    get filters(): FilterConfig[] {
        return JSON.parse(this._filters);
    }
    
    set filters(value: FilterConfig[]) {
        this._filters = JSON.stringify(value);
    }
}
```

## Implementation Steps

1. **Schema Extraction**
   - Add JSON schema type definitions
   - Implement XML comment parsing
   - Add schema extraction logic
   - Add error handling for malformed JSON

2. **Type Generation**
   - Update TypeMapper for JSON types
   - Generate interfaces from schemas
   - Add metadata generation
   - Preserve key paths

3. **Testing**
   - Add unit tests for schema extraction
   - Add tests for type generation
   - Validate generated TypeScript
   - Test with complex nested objects

4. **Documentation**
   - Update README with new features
   - Document schema format
   - Add examples for common patterns
   - Document error handling

## Success Criteria
1. Generated types include full JSON schema metadata
2. Key paths are preserved from C# attributes
3. Type-safe accessors are generated for JSON fields
4. XML comments are parsed correctly
5. Generated code compiles without errors
6. Unit tests pass
7. Documentation is complete

## Future Enhancements
1. Support for JSON Schema validation
2. Custom type mappings
3. Schema versioning
4. Migration helpers
5. Schema documentation generation
