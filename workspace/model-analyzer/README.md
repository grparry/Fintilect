# Model Analyzer

This tool analyzes JSON schema model files to extract field information and legacy model mappings.

## Installation

```bash
npm install
```

## Usage

Process all model files:
```bash
npm start
```

Process a specific file:
```bash
npm start -- --file=path/to/model.json
```

## Output Files

The tool generates three output files in the cbp-admin/docs directory:

1. `model_field_data.md`: Contains successfully extracted field information
2. `model_file_errors.md`: Lists files that couldn't be processed
3. `model_field_errors.md`: Lists fields where information couldn't be fully extracted

## Development

Run tests:
```bash
npm test
```
