#!/bin/bash

# Function to convert a path to relative
convert_to_relative() {
    local file=$1
    local file_dir=$(dirname "$file")
    local relative_to_src=$(realpath --relative-to="$file_dir" "/Users/grantparry/Documents/Fintilect/Fintilect/admin/cbp/src")
    
    # Replace @cbp-admin/../ with relative path
    sed -i '' "s|from '@cbp-admin/\.\./|from '$relative_to_src/|g" "$file"
    
    # Replace @cbp-admin/ with relative path when it's referring to internal files
    sed -i '' "s|from '@cbp-admin/|from '$relative_to_src/|g" "$file"
}

# Find all TypeScript files
find /Users/grantparry/Documents/Fintilect/Fintilect/admin/cbp/src -type f \( -name "*.ts" -o -name "*.tsx" \) | while read -r file; do
    convert_to_relative "$file"
done
