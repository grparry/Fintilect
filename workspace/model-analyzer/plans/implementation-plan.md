# Model Analyzer Implementation Plan

## Project Overview
Node.js application to analyze JSON schema model files from cbp-admin/src/api/models, extracting field information and legacy model mappings.

## Project Structure
```
model-analyzer/
├── package.json
├── src/
│   ├── index.js           # Main entry point
│   ├── fileScanner.js     # File discovery functionality
│   ├── schemaParser.js    # JSON schema parsing logic
│   ├── fieldExtractor.js  # Field information extraction
│   └── outputManager.js   # Output file management
└── test/
    ├── testData/         # Test JSON files
    └── unit/            # Unit tests
```

## Implementation Phases

### Phase 1: Project Setup
- [x] Initialize Node.js project with package.json
- [ ] Install required dependencies:
   - [x] fs-extra (file operations)
   - [x] glob (file pattern matching)
   - [x] path (path manipulation)
   - [x] jest (testing)

### Phase 2: File Scanner Implementation
- [x] Create fileScanner.js module
   - [x] Function to discover all JSON files in specified directory
   - [x] Support for single file processing mode
   - [x] Error handling for inaccessible files

### Phase 3: Schema Parser Implementation
- [x] Create schemaParser.js module
   - [x] JSON file reading and parsing
   - [x] Schema validation
   - [x] Root-level x-legacy-model extraction

### Phase 4: Field Extractor Implementation
- [x] Create fieldExtractor.js module
   - [x] Field traversal logic
   - [x] Field property extraction (name, x-legacy-model, x-setting-key)
   - [x] Support for field-level x-legacy-model overrides

### Phase 5: Output Manager Implementation
- [x] Create outputManager.js module
   - [x] Append extracted data to model_field_data.md
   - [x] Log file errors to model_file_errors.md
   - [x] Log field extraction errors to model_field_errors.md

### Phase 6: Main Program Implementation
- [x] Create index.js
   - [x] Command line argument parsing
   - [x] Orchestration of components
   - [x] Error handling and logging

### Phase 7: Testing
- [x] Create unit tests for each module
- [x] Create integration tests
- [x] Test with sample files
- [x] Test error handling scenarios

## Output File Formats

### model_field_data.md
```markdown
| Source Model | Field Name | Legacy Model | Setting Key |
|--------------|------------|--------------|-------------|
| path/to/model.json | fieldName | legacyModel | settingKey |
```

### model_file_errors.md
```markdown
# Model File Processing Errors
- path/to/problematic/file.json
```

### model_field_errors.md
```markdown
# Field Processing Errors
| Source Model | Field Name | Legacy Model | Setting Key |
|--------------|------------|--------------|-------------|
| path/to/model.json | fieldName | [not found] | settingKey |
```

## Command Line Interface
```bash
# Process all files
node index.js

# Process single file
node index.js --file=path/to/specific/model.json
```

## Next Steps
1. Create package.json and install dependencies
2. Implement each module following the phases outlined above
3. Create test files and implement testing
4. Document usage instructions in README.md
