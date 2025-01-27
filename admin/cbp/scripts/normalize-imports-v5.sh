#!/bin/bash

# This script normalizes import paths while preserving multi-line imports
# It replaces 'from "@/' with 'from "./' in TypeScript/React files

find ./src -type f \( -name "*.ts" -o -name "*.tsx" \) -print0 | while IFS= read -r -d '' file; do
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Process the file while preserving multi-line imports
    awk '
    BEGIN { in_import = 0 }
    {
        if ($0 ~ /^import.*{/ && !($0 ~ /} from/)) {
            # Start of multi-line import
            in_import = 1
            print $0
        }
        else if (in_import && $0 ~ /} from/) {
            # End of multi-line import
            in_import = 0
            gsub(/from "@\//, "from \"./")
            print $0
        }
        else if (!in_import && $0 ~ /^import/) {
            # Single line import
            gsub(/from "@\//, "from \"./")
            print $0
        }
        else {
            # Not an import line
            print $0
        }
    }' "$file" > "$temp_file"
    
    # Replace original file with processed content
    mv "$temp_file" "$file"
done

echo "Import statements have been normalized while preserving multi-line imports!"
