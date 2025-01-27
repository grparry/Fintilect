#!/usr/bin/env python3
import csv
import os
import re
from pathlib import Path
from typing import Optional

def extract_import_path(import_statement):
    # Extract the path from import statements like:
    # import { X } from './../types/api.types';
    # or import X from './../../components/common/X';
    match = re.search(r"from ['\"](\./\.\..*?)['\"]", import_statement)
    if match:
        return match.group(1)
    return None

def find_actual_file(base_path: str, extensions=['.ts', '.tsx', '.d.ts']) -> Optional[str]:
    """Try to find the actual file with various extensions"""
    # Remove any existing extension
    base_path = re.sub(r'\.tsx?$', '', base_path)
    
    for ext in extensions:
        if os.path.exists(f"{base_path}{ext}"):
            return f"{base_path}{ext}"
    return None

def resolve_import_path(source_file: str, import_path: str, src_root: Path) -> str:
    """
    Resolve the actual path that an import is referring to
    
    Args:
        source_file: The file containing the import (relative to src/)
        import_path: The import path from the statement
        src_root: The root src directory
    """
    try:
        # Remove src/ prefix if present in source_file
        if source_file.startswith('src/'):
            source_file = source_file[4:]
            
        # Get source directory path
        source_dir = Path(source_file).parent
        source_parts = source_dir.parts
        
        # Remove leading './' if present
        if import_path.startswith('./'):
            import_path = import_path[2:]
            
        # Parse target path
        target_parts = []
        current_parts = list(source_parts)
        
        # Process each part of the import path
        for part in import_path.split('/'):
            if part == '..':
                if current_parts:
                    current_parts.pop()
            else:
                target_parts.append(part)
        
        # Build the target path
        target_path = Path(*current_parts) / Path(*target_parts)
        
        # Try to find the actual file
        actual_path = find_actual_file(str(src_root / target_path))
        if actual_path:
            # Remove src/ prefix from actual path
            actual_rel = Path(actual_path).relative_to(src_root)
            target_parts = list(actual_rel.parts)
        
        # Calculate number of parent directories needed
        parents_needed = len(source_parts)
        
        # Build the final relative path
        return '/'.join(['..'] * parents_needed + target_parts)
        
    except Exception as e:
        print(f"Error resolving path for {source_file} -> {import_path}: {str(e)}")
        return import_path

def process_csv():
    src_root = Path('src').resolve()
    input_file = 'relative-imports.csv'
    output_file = 'processed-imports.csv'
    
    with open(input_file, 'r') as infile, open(output_file, 'w', newline='') as outfile:
        reader = csv.reader(infile)
        writer = csv.writer(outfile)
        
        # Write header
        header = next(reader)
        writer.writerow(header + ['Normalized Import'])
        
        # Process each row
        for row in reader:
            source_file = row[0].strip('"')  # Remove quotes if present
            import_statement = row[1].strip('"')
            
            import_path = extract_import_path(import_statement)
            if import_path:
                normalized_path = resolve_import_path(source_file, import_path, src_root)
                if normalized_path:
                    # Create new import statement with the normalized path, preserving quotes from original
                    quote = "'" if "'" in import_statement else '"'
                    new_import = import_statement.replace(import_path, normalized_path)
                else:
                    new_import = "ERROR: Could not normalize path"
            else:
                new_import = "ERROR: Could not extract import path"
            
            writer.writerow([source_file, import_statement, new_import])

if __name__ == '__main__':
    process_csv()
    print("Processing complete. Results saved to processed-imports.csv")
