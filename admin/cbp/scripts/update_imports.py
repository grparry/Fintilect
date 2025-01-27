#!/usr/bin/env python3
import csv
import os
import re
from pathlib import Path

def update_file_imports(file_path: str, old_import: str, new_import: str) -> bool:
    """
    Update imports in a file, replacing old_import with new_import.
    Returns True if file was modified, False otherwise.
    """
    try:
        # Read the entire file
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Escape special regex characters in the old import
        old_import_escaped = re.escape(old_import)
        
        # Create the new content, only if there's a match
        new_content = re.sub(old_import_escaped, new_import, content)
        
        # Only write if there were changes
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True
            
        return False
        
    except Exception as e:
        print(f"Error processing {file_path}: {str(e)}")
        return False

def main():
    # Get the absolute path to the CSV file
    script_dir = Path(__file__).parent.parent
    csv_path = script_dir / 'processed-imports-fixed.csv'
    
    # Keep track of statistics
    total_files = 0
    modified_files = 0
    failed_files = 0
    
    print("Starting import updates...")
    
    # Read and process the CSV file
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        next(reader)  # Skip header row
        
        for row in reader:
            if len(row) < 3:
                continue
                
            file_path, old_import, new_import = row[0:3]
            
            # Convert to absolute path if it's relative
            if not os.path.isabs(file_path):
                file_path = os.path.join(script_dir, file_path)
            
            total_files += 1
            
            # Skip if file doesn't exist
            if not os.path.exists(file_path):
                print(f"Warning: File not found: {file_path}")
                failed_files += 1
                continue
            
            print(f"Processing {file_path}...")
            if update_file_imports(file_path, old_import, new_import):
                print(f"  Updated: {old_import} -> {new_import}")
                modified_files += 1
            else:
                print(f"  No changes needed")
    
    # Print summary
    print("\nImport Update Summary")
    print("====================")
    print(f"Total files processed: {total_files}")
    print(f"Files modified: {modified_files}")
    print(f"Files failed: {failed_files}")

if __name__ == '__main__':
    main()
