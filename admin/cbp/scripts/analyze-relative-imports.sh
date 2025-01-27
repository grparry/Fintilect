#!/bin/bash

# Create or truncate the output file
echo "Source File,Import Statement" > relative-imports.csv

# Find all TypeScript files and process their imports
find ./src -type f \( -name "*.ts" -o -name "*.tsx" \) -print0 | while IFS= read -r -d '' file; do
    # Get all lines containing './.. imports
    grep -h "from '\./\.\.\|from \"./\.\." "$file" | while read -r line; do
        # Remove leading whitespace and escape any commas in the import statement
        cleaned_line=$(echo "$line" | sed 's/^[[:space:]]*//; s/,/\\,/g')
        # Output in CSV format
        echo "\"${file#./}\",\"$cleaned_line\"" >> relative-imports.csv
    done
done

echo "Analysis complete. Results saved to relative-imports.csv"
