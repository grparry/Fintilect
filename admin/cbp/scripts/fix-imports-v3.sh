#!/bin/bash

# Directory containing TypeScript/TSX files
SRC_DIR="/Users/grantparry/Documents/Fintilect/Fintilect/admin/cbp/src"

# Function to fix a single file's imports
fix_imports() {
    local file="$1"
    echo "Fixing imports in $file..."
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Fix various import patterns
    sed -E '
        # Fix duplicate segments in paths
        s/([a-zA-Z0-9_-]+)\/\1/\1/g;
        
        # Convert @cbp-admin/ to @/ for internal imports
        s/@cbp-admin\/([^.]+)\.types/@\/\1.types/g;
        
        # Convert relative paths to @/ format for internal imports
        s/from '\''\.\.\/([^.]+)\/\1'\''/from '\''@\/\1'\''/g;
        s/from '\''\.\.\/([^'\'']+)'\''/from '\''@\/\1'\''/g;
        
        # Fix paths with duplicate segments
        s/\/types\/([a-zA-Z0-9_-]+)\.types\/types\/\1\.types/\/types\/\1.types/g;
        s/\/services\/([a-zA-Z0-9_-]+)\/services\/\1/\/services\/\1/g;
        s/\/components\/([a-zA-Z0-9_-]+)\/components\/\1/\/components\/\1/g;
        s/\/interfaces\/([a-zA-Z0-9_-]+)\/interfaces\/\1/\/interfaces\/\1/g;
    ' "$file" > "$temp_file"
    
    # Only update if changes were made
    if ! cmp -s "$file" "$temp_file"; then
        mv "$temp_file" "$file"
        echo "Updated $file"
    else
        rm "$temp_file"
        echo "No changes needed in $file"
    fi
}

# Find and process all TypeScript/TSX files
find "$SRC_DIR" -type f \( -name "*.ts" -o -name "*.tsx" \) | while read -r file; do
    fix_imports "$file"
done

echo "Import paths have been fixed to match original project patterns!"
