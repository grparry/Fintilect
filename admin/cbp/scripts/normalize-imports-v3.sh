#!/bin/bash

echo "Normalizing import statements..."

# Function to process a file
process_file() {
    local file="$1"
    echo "Processing: $file"
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Process the file, skipping third-party imports
    sed '/from.*@\(mui\|testing-library\|jest\|tinymce\)/!s/ from '\''@/ from '\''./' "$file" > "$temp_file"
    
    # Move the temporary file back to the original
    mv "$temp_file" "$file"
}

# Find all TypeScript and TSX files in src directory
find src -type f \( -name "*.ts" -o -name "*.tsx" \) | while read -r file; do
    process_file "$file"
done

echo "Import normalization complete!"
