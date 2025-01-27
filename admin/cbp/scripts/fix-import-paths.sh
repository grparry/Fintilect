#!/bin/bash

# Function to convert a path to relative
function to_relative_path() {
    local from_file="$1"
    local import_path="$2"
    
    # Remove @cbp-admin/ prefix
    import_path="${import_path#@cbp-admin/}"
    # Remove leading ../
    import_path="${import_path#../}"
    
    # Get the directory of the source file relative to src
    local from_dir=$(dirname "$from_file")
    from_dir="${from_dir#src/}"
    
    # Calculate relative path
    local depth=$(echo "$from_dir" | tr -cd '/' | wc -c)
    local rel_prefix=""
    for ((i=0; i<depth+1; i++)); do
        rel_prefix="../$rel_prefix"
    done
    
    echo "${rel_prefix}${import_path}"
}

# Process each TypeScript/TSX file
find src -type f \( -name "*.ts" -o -name "*.tsx" \) | while read -r file; do
    echo "Processing $file..."
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Process the file line by line
    while IFS= read -r line; do
        if [[ $line =~ from[[:space:]]+[\'\"]@cbp-admin/\.\./(.+)[\'\"] ]]; then
            # Get the import path
            import_path="${BASH_REMATCH[1]}"
            # Convert to relative path
            rel_path=$(to_relative_path "$file" "../$import_path")
            # Replace the import path
            line="${line//@cbp-admin\/..//$rel_path}"
        elif [[ $line =~ from[[:space:]]+[\'\"]@cbp-admin/([^\.][^\'\"]+)[\'\"] ]]; then
            # Get the import path that doesn't start with ../
            import_path="${BASH_REMATCH[1]}"
            # Convert to relative path if it's within src
            if [[ -f "src/$import_path.ts" || -f "src/$import_path.tsx" ]]; then
                rel_path=$(to_relative_path "$file" "$import_path")
                line="${line//@cbp-admin\//$rel_path}"
            fi
        fi
        echo "$line" >> "$temp_file"
    done < "$file"
    
    # Replace original file with processed file
    mv "$temp_file" "$file"
done

echo "Import paths have been updated!"
