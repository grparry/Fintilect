#!/bin/bash

ORIGINAL_PROJECT="/Users/grantparry/Documents/Fintilect/Fintilect/cbp-admin"
NEW_PROJECT="/Users/grantparry/Documents/Fintilect/Fintilect/admin/cbp"

# Function to extract imports from a file
extract_imports() {
    local file="$1"
    grep -E "^import.*from.*'.*'|^import.*from.*\".*\"" "$file" | sort
}

# Function to get relative path from src
get_relative_path() {
    local file="$1"
    local base_dir="$2"
    echo "${file#$base_dir/src/}"
}

echo "Comparing imports between original and new projects..."
echo

# Process each TypeScript/TSX file in the new project
find "$NEW_PROJECT/src" -type f \( -name "*.ts" -o -name "*.tsx" \) | while read -r new_file; do
    rel_path=$(get_relative_path "$new_file" "$NEW_PROJECT")
    original_file="$ORIGINAL_PROJECT/src/$rel_path"
    
    # Only compare if the original file exists
    if [[ -f "$original_file" ]]; then
        echo "=== Comparing $rel_path ==="
        echo "Original imports:"
        extract_imports "$original_file"
        echo
        echo "New imports:"
        extract_imports "$new_file"
        echo
        echo "----------------------------------------"
    fi
done
