#!/usr/bin/env python3
import os
from pathlib import Path
import re

def extract_imports(content):
    """Extract import statements from file content, handling multi-line imports"""
    import_lines = []
    lines = content.split('\n')
    in_import = False
    brace_count = 0
    current_import = []
    
    for line in lines:
        stripped = line.strip()
        
        # Start of import
        if (stripped.startswith('import ') or stripped.startswith('from ')) and not in_import:
            in_import = True
            current_import = [line]
            # Check for braces in first line
            brace_count += line.count('{') - line.count('}')
            if brace_count == 0 and ';' in line:  # Single line import
                import_lines.append(line)
                in_import = False
                current_import = []
            continue
            
        # Continue collecting multi-line import
        if in_import:
            current_import.append(line)
            brace_count += line.count('{') - line.count('}')
            
            # Check if import statement is complete
            if brace_count == 0 and (';' in line or '}' in line):
                import_lines.append('\n'.join(current_import))
                in_import = False
                current_import = []
                
    return import_lines

def merge_file_contents(new_file_path, old_file_path, output_path):
    """Merge file contents, keeping new imports but old content"""
    try:
        with open(new_file_path, 'r') as f:
            new_content = f.read()
        with open(old_file_path, 'r') as f:
            old_content = f.read()

        # Extract all imports from new file
        new_imports = extract_imports(new_content)
        
        # Remove all imports from old content
        old_lines = old_content.split('\n')
        non_import_lines = []
        in_import = False
        brace_count = 0
        
        for line in old_lines:
            stripped = line.strip()
            
            # Check for start of import
            if (stripped.startswith('import ') or stripped.startswith('from ')) and not in_import:
                in_import = True
                brace_count += line.count('{') - line.count('}')
                if brace_count == 0 and ';' in line:  # Single line import
                    in_import = False
                continue
                
            # Skip lines that are part of multi-line import
            if in_import:
                brace_count += line.count('{') - line.count('}')
                if brace_count == 0 and (';' in line or '}' in line):
                    in_import = False
                continue
                
            non_import_lines.append(line)
        
        # Combine new imports with old content
        merged_content = '\n'.join(new_imports) + '\n\n' + '\n'.join(line for line in non_import_lines if line.strip())
        
        # Ensure output directory exists
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # Write merged content
        with open(output_path, 'w') as f:
            f.write(merged_content)
            
        print(f"Successfully merged {new_file_path}")
        return True
    except Exception as e:
        print(f"Error merging {new_file_path}: {str(e)}")
        return False

def process_directory(new_base_dir, old_base_dir, output_base_dir):
    """Process all files in the directory recursively"""
    new_base = Path(new_base_dir)
    old_base = Path(old_base_dir)
    output_base = Path(output_base_dir)
    
    success_count = 0
    error_count = 0
    
    for new_path in new_base.rglob('*'):
        if new_path.is_file():
            # Get relative path
            rel_path = new_path.relative_to(new_base)
            old_path = old_base / rel_path
            output_path = output_base / rel_path
            
            if old_path.exists():
                if merge_file_contents(str(new_path), str(old_path), str(output_path)):
                    success_count += 1
                else:
                    error_count += 1
    
    return success_count, error_count

if __name__ == '__main__':
    # Define directories
    new_src = '/Users/grantparry/Documents/Fintilect/Fintilect/admin/cbp/src_bak'
    old_src = '/Users/grantparry/Documents/Fintilect/Fintilect/cbp-admin/src'
    output_dir = '/Users/grantparry/Documents/Fintilect/Fintilect/admin/cbp/src'
    
    print("Starting merge process...")
    success, errors = process_directory(new_src, old_src, output_dir)
    print(f"\nMerge complete!")
    print(f"Successfully merged: {success} files")
    print(f"Errors: {errors} files")
    print(f"\nMerged files are in: {output_dir}")
    print("Please review the merged files before proceeding.")
