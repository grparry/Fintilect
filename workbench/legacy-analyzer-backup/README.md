# Legacy Analyzer

A Node.js application for analyzing C# settings classes in legacy code.

## Features

- Discovers C# settings classes in specified directories
- Extracts field information and SettingKey attributes
- Identifies validation rules
- Generates detailed reports in markdown format
- Supports single file analysis for testing

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

## Usage

Run the analyzer:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Available Scripts

- `npm start` - Run the application
- `npm run build` - Build the TypeScript code
- `npm test` - Run tests
- `npm run watch` - Watch for changes and rebuild
- `npm run dev` - Run with auto-reload for development

## Output

The analyzer generates two main output files:

1. `output/legacy_field_data.md` - Contains extracted field information
2. `output/legacy_file_errors.md` - Lists any files that couldn't be processed

## Logging

Logs are written to `logs/app.log`
