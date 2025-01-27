#!/bin/bash

ORIGINAL_PROJECT="/Users/grantparry/Documents/Fintilect/Fintilect/cbp-admin"
NEW_PROJECT="/Users/grantparry/Documents/Fintilect/Fintilect/admin/cbp"

# Function to get relative path from src
get_relative_path() {
    local file="$1"
    local base_dir="$2"
    echo "${file#$base_dir/src/}"
}

# Function to update imports in a file
update_imports() {
    local new_file="$1"
    local original_file="$2"
    local rel_path="$3"
    
    if [[ ! -f "$original_file" ]]; then
        echo "No corresponding file found for: $rel_path"
        return
    fi
    
    echo "Processing: $rel_path"
    
    # Create temporary files
    local temp_file=$(mktemp)
    local imports_temp=$(mktemp)
    
    # Extract content between first import and last import (inclusive)
    awk '
        BEGIN { in_imports = 0; buffer = ""; }
        /^import/ { 
            if (!in_imports) {
                in_imports = 1;
            }
        }
        {
            if (in_imports) {
                buffer = buffer $0 "\n"
            }
        }
        /^[^i]/ && in_imports { 
            if ($0 !~ /^[ \t]*[A-Za-z,}]/) {
                in_imports = 0;
                print buffer;
            }
        }
    ' "$original_file" > "$imports_temp"
    
    # Get the rest of the new file (everything after imports)
    awk '
        BEGIN { found_non_import = 0 }
        /^import/ || /^[ \t]*[A-Za-z,}]/ { next }
        { found_non_import = 1 }
        found_non_import { print }
    ' "$new_file" > "$temp_file"
    
    # If we found imports in the original file
    if [[ -s "$imports_temp" ]]; then
        # Combine imports with rest of file
        cat "$imports_temp" "$temp_file" > "$new_file"
        echo "Updated imports in: $rel_path"
    else
        echo "No imports found in original file: $rel_path"
    fi
    
    # Cleanup
    rm "$temp_file" "$imports_temp"
}

echo "Starting import migration..."

# Process each TypeScript/TSX file in the new project
find "$NEW_PROJECT/src" -type f \( -name "*.ts" -o -name "*.tsx" \) | while read -r new_file; do
    # Get relative path
    rel_path=$(get_relative_path "$new_file" "$NEW_PROJECT")
    
    # Construct path to original file
    original_file="$ORIGINAL_PROJECT/src/$rel_path"
    
    # Update imports
    update_imports "$new_file" "$original_file" "$rel_path"
done

echo "Import statements have been copied from original project!"
