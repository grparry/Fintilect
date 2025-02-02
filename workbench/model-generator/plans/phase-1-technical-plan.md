# Phase 1: Core Infrastructure - Technical Plan

## Overview
Phase 1 establishes the core infrastructure and basic functionality of the model-generator. This phase focuses on setting up a clean, maintainable architecture while implementing essential features.

## Component Details

### 1. Parser Module (`src/parser/`)

#### Core Interfaces
```typescript
interface IModelParser {
  parseFile(path: string): Promise<ParsedClass[]>;
  parseSource(content: string): Promise<ParsedClass[]>;
}

interface ParsedClass {
  name: string;
  namespace?: string;
  fields: ParsedField[];
  isPublic: boolean;
  // ... other properties from legacy-analyzer
}
```

#### Implementation Plan
1. Port core parser from legacy-analyzer
   - ClassParser
   - DocumentationParser
   - AttributeParser
   - EnumParser

2. Create clean interfaces
   - Abstract parser interface
   - Type definitions
   - Error types

3. Add parser configuration
   - Parser options
   - Type filtering
   - Error handling

### 2. Type System (`src/mapper/`)

#### Core Interfaces
```typescript
interface ITypeMapper {
  mapType(csharpType: string): TypeScriptType;
  resolveImports(type: TypeScriptType): Import[];
}

interface TypeScriptType {
  name: string;
  isNullable: boolean;
  typeArguments?: TypeScriptType[];
  importPath?: string;
}
```

#### Implementation Plan
1. Basic type mapping
   - Primitive types
   - Built-in types
   - Array types

2. Generic support
   - Type parameters
   - Constraints
   - Default types

3. Import management
   - Path resolution
   - Deduplication
   - Alias handling

### 3. Generator Module (`src/generator/`)

#### Core Interfaces
```typescript
interface ICodeGenerator {
    // Main generation
    generate(model: TypeScriptClass): Promise<GeneratedCode>;
    
    // Template management
    initializeTemplates(): Promise<void>;
    copyBaseFiles(outputDir: string): Promise<void>;
}

interface GeneratedCode {
    content: string;
    imports: Import[];
    sourceMap?: SourceMap;
}

interface TemplateManager {
    // Template operations
    loadTemplates(): Promise<void>;
    getStaticTemplate(name: string): string;
    getGenerationTemplate(name: string): HandlebarsTemplate;
}
```

#### Implementation Plan
1. Template System
   - Copy base templates from pilot project
   - Set up Handlebars for generation
   - Implement template helpers

2. Code Generation
   - Class generation templates
   - Property generation templates
   - Metadata generation

3. Output Management
   - File writing
   - Import handling
   - Source maps

### 4. File System (`src/fs/`)

#### Core Interfaces
```typescript
interface IFileSystem {
  readSource(path: string): Promise<string>;
  writeOutput(path: string, content: string): Promise<void>;
  resolveOutputPath(namespace: string): string;
}
```

#### Implementation Plan
1. File operations
   - Source reading
   - Output writing
   - Directory creation

2. Path resolution
   - Namespace mapping
   - Import paths
   - Project structure

3. Error handling
   - File not found
   - Permission issues
   - Path resolution

### 5. Namespace Management

#### Core Types
```typescript
interface NamespaceConfig {
    // Base namespace for all generated code (e.g. "Psi.Data.Models")
    baseNamespace: string;
    
    // Directory to namespace mappings
    directoryMappings: {
        [directory: string]: string;
    };
    
    // Optional namespace transformations
    transforms?: {
        prefix?: string;
        suffix?: string;
    };
}

interface NamespaceManager {
    // Convert directory path to namespace
    pathToNamespace(path: string): string;
    
    // Convert namespace to directory path
    namespaceToPath(namespace: string): string;
    
    // Get import path between two namespaces
    getImportPath(from: string, to: string): string;
}
```

#### Implementation Plan
1. Namespace Configuration
   - Load from config file
   - Support directory mappings
   - Handle custom transforms

2. Path Resolution
   - Directory to namespace conversion
   - Namespace to directory conversion
   - Import path generation

3. Integration
   - Parser namespace extraction
   - Generator namespace handling
   - Import path resolution

## Testing Strategy

### Unit Tests
1. Parser Tests
   ```typescript
   describe('ModelParser', () => {
     it('should parse class declaration', async () => {
       const source = `
         public class TestClass {
           public string Name { get; set; }
         }`;
       const result = await parser.parseSource(source);
       expect(result[0].name).toBe('TestClass');
     });
   });
   ```

2. Type Mapper Tests
   ```typescript
   describe('TypeMapper', () => {
     it('should map C# types to TypeScript', () => {
       expect(mapper.mapType('string')).toEqual({
         name: 'string',
         isNullable: false
       });
     });
   });
   ```

3. Generator Tests
   ```typescript
   describe('CodeGenerator', () => {
     it('should generate class definition', () => {
       const model = {
         name: 'TestClass',
         properties: [/* ... */]
       };
       const result = generator.generate(model);
       expect(result.content).toContain('export class TestClass');
     });
   });
   ```

### Integration Tests
1. End-to-end generation
2. File system operations
3. Error handling
4. Import resolution

## Implementation Schedule

### Week 1
1. Project setup (Day 1)
   - Repository setup
   - Build configuration
   - Test framework

2. Parser integration (Days 2-3)
   - Port parser code
   - Add interfaces
   - Basic tests

3. Type mapper (Days 4-5)
   - Basic type mapping
   - Generic support
   - Initial tests

### Week 2
1. Generator (Days 1-2)
   - Basic generation
   - Templates
   - Tests

2. File system (Days 3-4)
   - Core operations
   - Path resolution
   - Integration tests

3. Integration (Day 5)
   - Component integration
   - End-to-end tests
   - Documentation

## Success Criteria

### Functionality
1. Parse basic C# classes
2. Generate TypeScript classes
3. Handle basic types
4. Manage file I/O

### Quality
1. Clean interfaces
2. Good test coverage
3. Error handling
4. Documentation

### Performance
1. Quick parsing
2. Efficient generation
3. Fast tests

## Next Steps
1. Review and adjust interfaces
2. Start implementation
3. Set up CI/CD
4. Begin Phase 2 planning
