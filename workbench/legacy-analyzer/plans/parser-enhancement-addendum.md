# Parser Enhancement Addendum

## Overview
This document details the parser enhancements required to support JSON-structured settings in the CBP admin application. These enhancements are **Phase 1** of the overall settings generator enhancement plan detailed in [settings-generator-enhancements.md](settings-generator-enhancements.md).

## Implementation Timeline
1. **Week 1: Parser Enhancements** (This Document)
   - Implement JSON schema extraction
   - Add example processing
   - Update type system
   
2. **Week 2: Generator Work** ([settings-generator-enhancements.md](settings-generator-enhancements.md))
   - Implement generator changes
   - Update documentation generation
   
3. **Week 3: Integration**
   - Test full pipeline
   - Update existing settings

## Existing Parser Capabilities
The current parser implementation already provides most of the required functionality:

1. **Documentation Parsing**
   - XML comment extraction
   - Tag processing
   - Content cleaning
   - Source tracking

2. **Type System**
   - Field type parsing
   - Attribute handling
   - Validation rule collection
   - Documentation type linking

3. **Class Structure**
   - Full class parsing
   - Property/field extraction
   - Namespace handling
   - Generic support

## Required Enhancements

### 1. JSON Schema Extraction
Add to `DocumentationParser`:
```typescript
public static extractJsonSchema(documentation: string): JsonSchema | undefined {
  const remarksMatch = documentation.match(/<remarks>\s*(.*?)\s*<\/remarks>/s);
  if (remarksMatch) {
    return this.parseJsonExample(remarksMatch[1]);
  }
}

private static parseJsonExample(example: string): JsonSchema {
  // Convert JSON example to schema
  // Extract property types and structure
  // Return typed schema definition
}
```

### 2. Type Definition Updates
Add to `types.ts`:
```typescript
interface JsonSchema {
  type: 'object' | 'array';
  properties?: Record<string, {
    type: string;
    description?: string;
    required?: boolean;
  }>;
  items?: JsonSchema;  // For arrays
}

interface ParsedFieldExtended extends ParsedField {
  jsonSchema?: JsonSchema;
  examples?: string[];
}
```

### 3. Example Processing
Add to `DocumentationParser`:
```typescript
public static extractExamples(documentation: string): string[] {
  return documentation.match(/```[^`]+```/g) || [];
}

public static categorizeExample(example: string): {
  type: 'json' | 'csharp' | 'typescript' | 'other';
  content: string;
} {
  // Categorize and clean example code
}
```

## Test-Driven Development Plan

### Unit Tests (`tests/unit/parser/jsonSchemaParser.test.ts`)

```typescript
describe('JsonSchemaParser', () => {
    describe('extractJsonSchema', () => {
        it('should extract JSON schema from remarks tag', async () => {
            const doc = `
                /// <summary>
                /// The filters configuration
                /// </summary>
                /// <remarks>
                /// [{
                ///     "Name": "Transaction Post Date",
                ///     "ValuesCausingInclusion": "",
                ///     "ValuesCausingExclusion": "",
                ///     "RequiresValue": true,
                ///     "ErrorMessage": "Transaction Post Date is required"
                /// }]
                /// </remarks>
            `;
            const schema = await parser.extractJsonSchema(doc);
            expect(schema).toEqual({
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        valuesCausingInclusion: { type: 'string' },
                        valuesCausingExclusion: { type: 'string' },
                        requiresValue: { type: 'boolean' },
                        errorMessage: { type: 'string' }
                    }
                }
            });
        });

        it('should handle malformed JSON in remarks', async () => {
            const doc = `
                /// <remarks>
                /// [{ Invalid JSON }]
                /// </remarks>
            `;
            await expect(parser.extractJsonSchema(doc))
                .rejects.toThrow('Invalid JSON schema in documentation');
        });
    });

    describe('generateTypeScript', () => {
        it('should generate TypeScript interface from schema', async () => {
            const schema = {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' }
                    }
                }
            };
            const ts = await parser.generateTypeScript(schema, 'FilterConfig');
            expect(ts).toContain('interface FilterConfig {');
            expect(ts).toContain('name: string;');
        });
    });
});
```

### Integration Tests (`tests/integration/jsonSchema.test.ts`)

```typescript
describe('JSON Schema Integration', () => {
    it('should process a class with JSON-structured fields', async () => {
        const source = `
            public class TestSettings {
                /// <summary>
                /// The filters configuration
                /// </summary>
                /// <remarks>
                /// [{
                ///     "Name": "Test Filter",
                ///     "RequiresValue": true
                /// }]
                /// </remarks>
                [SettingKey("test.filters")]
                public string Filters { get; set; }
            }
        `;
        
        const result = await processSource(source);
        expect(result).toContain('interface FilterConfig {');
        expect(result).toContain('name: string;');
        expect(result).toContain('requiresValue: boolean;');
        expect(result).toContain('get filters(): FilterConfig[]');
    });

    it('should handle multiple JSON-structured fields', async () => {
        const source = `
            public class TestSettings {
                /// <remarks>
                /// { "path": "/test", "pattern": "*.txt" }
                /// </remarks>
                public string PathConfig { get; set; }

                /// <remarks>
                /// [{ "name": "Test" }]
                /// </remarks>
                public string Filters { get; set; }
            }
        `;
        
        const result = await processSource(source);
        expect(result).toContain('interface PathConfig {');
        expect(result).toContain('interface FilterConfig {');
    });
});
```

### Test Fixtures (`tests/fixtures/json-schema/`)
1. Create sample C# files with JSON documentation
2. Add expected TypeScript output files
3. Add malformed JSON examples
4. Add complex nested JSON examples

## Test Cases
The parser enhancements will be tested against three real-world settings classes in `tests/fixtures/json-schema/`:

### 1. Complex JSON (PscuLogFileTransformServiceSettings)
- Source: `PscuLogFileTransformServiceSettings.cs`
- Parser Output Used By: `PscuLogFileTransformServiceSettings.expected.ts`

Tests JSON schema extraction from complex structures including:
- Nested JSON arrays in remarks tags
- Multiple JSON-structured fields
- Complex validation rules
- Extensive documentation

The parser must extract complete JSON schemas and examples from the source file to enable proper TypeScript interface generation.

### 2. Multiple Properties (PasswordSettings)
- Source: `PasswordSettings.cs`
- Parser Output Used By: `PasswordSettings.expected.ts`

Tests parsing of multiple primitive properties with:
- Different data types (bool, double)
- Various documentation styles
- Different attribute patterns
- UI-related settings

The parser must correctly identify property types and extract documentation to enable proper TypeScript property generation.

### 3. Simple Boolean (PasswordVerificationSettings)
- Source: `PasswordVerificationSettings.cs`
- Parser Output Used By: `PasswordVerificationSettings.expected.ts`

Tests basic property parsing with:
- Simple boolean property
- Standard documentation format
- Basic attribute pattern
- No JSON structures

The parser must handle this basic case perfectly as it represents a common pattern in the codebase.

### Parser Requirements
For all test cases, the parser must correctly handle:
1. JSON schema extraction from remarks
2. Property type inference
3. Documentation extraction
4. Attribute parsing
5. Namespace resolution

The parser's output will be validated against the `.expected.ts` files in the test fixtures, which demonstrate the required TypeScript output for each case.

See the test fixtures in `tests/fixtures/json-schema/` for complete implementation details.

## Implementation Plan

1. **Phase 1: Schema Extraction**
   - Add JSON schema extraction to DocumentationParser
   - Update ParsedField type definition
   - Add example processing

2. **Phase 2: Type Enhancement**
   - Extend type system for JSON structures
   - Add schema validation
   - Update type generation

3. **Phase 3: Integration**
   - Connect parser enhancements to generator
   - Update documentation generation
   - Add validation generation

## Testing Strategy

1. **Unit Tests**
   - Test JSON schema extraction
   - Verify example processing
   - Validate type generation

2. **Integration Tests**
   - Test full parsing pipeline
   - Verify documentation generation
   - Test type safety

3. **Validation Tests**
   - Test schema validation
   - Verify error handling
   - Check type consistency

## Success Metrics

1. **Accuracy**
   - Correct JSON schema extraction
   - Accurate type generation
   - Proper validation rules

2. **Completeness**
   - All JSON structures identified
   - All examples processed
   - Full type coverage

3. **Performance**
   - Minimal parsing overhead
   - Efficient schema generation
   - Quick validation
