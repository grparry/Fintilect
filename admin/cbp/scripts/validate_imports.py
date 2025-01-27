#!/usr/bin/env python3
import csv
import os
from pathlib import Path
from typing import Optional, Dict, List, Tuple

def find_actual_file(target_path: Path) -> Optional[Path]:
    """Try to find the actual file by trying different extensions"""
    print(f"\nLooking for file: {target_path}")
    
    # Try common TypeScript extensions
    extensions = ['.types.ts', '.ts', '.tsx', '.d.ts', '']
    
    # First try with existing extension
    if target_path.exists():
        print(f"Found exact match: {target_path}")
        return target_path
        
    # Try with each extension
    base_path = target_path.parent / target_path.stem.replace('.types', '')
    
    # Try other extensions
    for ext in extensions:
        test_path = base_path.with_suffix(ext)
        print(f"Trying: {test_path}")
        if test_path.exists():
            print(f"Found with extension: {test_path}")
            return test_path
    
    print("File not found")
    return None

def resolve_import_path(source_file: str, import_path: str) -> Tuple[str, str]:
    """
    Resolve the actual path that an import is referring to
    
    Args:
        source_file: The file containing the import (relative to src/)
        import_path: The import path from the statement
    """
    try:
        # Remove src/ prefix if present in source_file
        if source_file.startswith('src/'):
            source_file = source_file[4:]
            
        # Get source directory path
        source_dir = Path(source_file).parent
        
        # Remove leading './' if present
        if import_path.startswith('./'):
            import_path = import_path[2:]
            
        # Split import path into parts
        import_parts = import_path.split('/')
        
        # Handle relative imports
        current_parts = list(source_dir.parts)
        for part in import_parts:
            if part == '..':
                if current_parts:
                    current_parts.pop()
            else:
                current_parts.append(part)
                
        # All imports should be relative to src/
        resolved_path = Path('src') / '/'.join(current_parts)
            
        return str(resolved_path), None
        
    except Exception as e:
        return None, str(e)

def main():
    # Read the CSV file
    results = []
    valid_count = 0
    missing_count = 0
    error_count = 0
    
    with open('import-validation.csv', 'w', newline='') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(['Source File', 'Import Statement', 'Normalized Import', 'Status', 'Resolved Path', 'Error'])
        
        with open('processed-imports-fixed.csv', 'r') as infile:
            reader = csv.DictReader(infile)
            for row in reader:
                source_file = row['Source File']
                import_statement = row['Import Statement']
                normalized_import = row['Normalized Import']
                
                # Extract import path from the normalized import statement
                import_path = normalized_import.split(' from ')[1].strip().strip("';")
                
                # Resolve the import path
                resolved_path, error = resolve_import_path(source_file, import_path)
                
                if error:
                    status = 'error'
                    error_count += 1
                else:
                    # Check if file exists
                    actual_file = find_actual_file(Path(resolved_path))
                    if actual_file:
                        status = 'valid'
                        resolved_path = str(actual_file)
                        valid_count += 1
                    else:
                        status = 'missing'
                        error = f'File not found: {resolved_path}'
                        missing_count += 1
                
                writer.writerow([
                    source_file,
                    import_statement,
                    normalized_import,
                    status,
                    resolved_path,
                    error or ''
                ])
    
    # Write summary
    with open('import-validation-summary.txt', 'w') as f:
        f.write('\nImport Validation Summary\n')
        f.write('======================\n\n')
        f.write(f'Total imports processed: {valid_count + missing_count + error_count}\n')
        f.write(f'Valid imports: {valid_count}\n')
        f.write(f'Missing files: {missing_count}\n')
        f.write(f'Errors: {error_count}\n\n\n')
        f.write('Detailed error report:\n')
        f.write('====================\n')

if __name__ == '__main__':
    main()
    print("Validation complete. Results saved to import-validation.csv")
    print("Summary saved to import-validation-summary.txt")
