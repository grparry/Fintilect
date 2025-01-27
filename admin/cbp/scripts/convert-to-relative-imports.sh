#!/bin/bash

# Find all TypeScript and TSX files in src directory
find src -type f \( -name "*.ts" -o -name "*.tsx" \) | while read -r file; do
    # Replace @/ with ./ in import statements, handling both single and double quotes
    sed -i '' "s/from '@\//from '.\//" "$file"
    sed -i '' 's/from "@\//from ".\//g' "$file"
done

echo "Import statements have been converted to relative paths!"
