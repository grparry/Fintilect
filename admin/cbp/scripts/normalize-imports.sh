#!/bin/bash

echo "Normalizing import statements..."

# Function to process a file
process_file() {
    local file="$1"
    echo "Processing: $file"
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Process the file line by line
    while IFS= read -r line; do
        # Skip third-party package imports (like @mui)
        if [[ $line =~ from[[:space:]]*[\"\']@mui/ ]] || [[ $line =~ from[[:space:]]*[\"\']@testing-library/ ]] || [[ $line =~ from[[:space:]]*[\"\']@jest/ ]] || [[ $line =~ from[[:space:]]*[\"\']@tinymce/ ]]; then
            echo "$line" >> "$temp_file"
        # Convert @/../ to ../
        elif [[ $line =~ from[[:space:]]*[\"\']@/\.\./([^\"\']*)[\"\'] ]]; then
            echo "${line/@\/..\//../}" >> "$temp_file"
        # Convert @/ to ./
        elif [[ $line =~ from[[:space:]]*[\"\']@/([^\"\']*)[\"\'] ]]; then
            echo "${line/@\//./}" >> "$temp_file"
        else
            echo "$line" >> "$temp_file"
        fi
    done < "$file"
    
    # Move the temporary file back to the original
    mv "$temp_file" "$file"
}

# Find all TypeScript and TSX files in src directory
find src -type f \( -name "*.ts" -o -name "*.tsx" \) | while read -r file; do
    process_file "$file"
done

echo "Import normalization complete!"
