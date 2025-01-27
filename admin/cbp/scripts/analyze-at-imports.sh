#!/bin/bash

echo "Analyzing @ import patterns..."

# Find all TypeScript and TSX files
find src -type f \( -name "*.ts" -o -name "*.tsx" \) | while read -r file; do
    # Extract imports with @
    imports=$(grep -h "from '@" "$file" || grep -h 'from "@' "$file" || true)
    if [ ! -z "$imports" ]; then
        echo "File: $file"
        echo "$imports" | while read -r line; do
            # Get the import path
            path=$(echo "$line" | sed -n "s/.*from ['\"]@\([^'\"]*\)['\"].*/\1/p")
            if [ ! -z "$path" ]; then
                echo "  Import: @$path"
                
                # Check if this is a relative or absolute import
                if [[ $path == /* ]]; then
                    echo "    Type: Absolute"
                elif [[ $path == ../* ]]; then
                    echo "    Type: Parent Directory"
                else
                    echo "    Type: Current Directory"
                fi
            fi
        done
        echo ""
    fi
done
