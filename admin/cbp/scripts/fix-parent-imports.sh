#!/bin/bash

# Find all TypeScript and TSX files in src directory
find src -type f \( -name "*.ts" -o -name "*.tsx" \) | while read -r file; do
    # Replace './../' with '../' in import statements, handling both single and double quotes
    sed -i '' "s/from '\.\/\.\./from '../" "$file"
    sed -i '' 's/from "\.\/\.\./from "../' "$file"
done

echo "Parent directory imports have been fixed!"
