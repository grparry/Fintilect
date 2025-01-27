#!/bin/bash

echo "Normalizing import statements..."

# Function to process a file
process_file() {
    local file="$1"
    echo "Processing: $file"
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Process the file line by line, handling multi-line imports
    awk '
    BEGIN { in_import = 0; import_buffer = ""; }
    {
        # If we are in a multi-line import statement, append to buffer
        if (in_import) {
            import_buffer = import_buffer "\n" $0
            if ($0 ~ /;/) {
                in_import = 0
                process_import()
                import_buffer = ""
            }
        }
        # Start of new import statement
        else if ($0 ~ /^[[:space:]]*import[[:space:]]/) {
            in_import = 1
            import_buffer = $0
            if ($0 ~ /;/) {
                in_import = 0
                process_import()
                import_buffer = ""
            }
        }
        # Not an import statement, print as is
        else {
            print $0
        }
    }
    
    function process_import() {
        # Skip third-party package imports
        if (import_buffer ~ /from[[:space:]]*["\x27]@(mui|testing-library|jest|tinymce)\//) {
            print import_buffer
        }
        # Convert @/../ to ../
        else if (import_buffer ~ /from[[:space:]]*["\x27]@\/\.\.[\/]/) {
            gsub(/@\/\.\.\//, "../", import_buffer)
            print import_buffer
        }
        # Convert @/ to ./
        else if (import_buffer ~ /from[[:space:]]*["\x27]@\//) {
            gsub(/@\//, "./", import_buffer)
            print import_buffer
        }
        else {
            print import_buffer
        }
    }
    ' "$file" > "$temp_file"
    
    # Move the temporary file back to the original
    mv "$temp_file" "$file"
}

# Find all TypeScript and TSX files in src directory
find src -type f \( -name "*.ts" -o -name "*.tsx" \) | while read -r file; do
    process_file "$file"
done

echo "Import normalization complete!"
