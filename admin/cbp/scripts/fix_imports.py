#!/usr/bin/env python3
import csv

def fix_import(source_file, normalized_import):
    """Fix the normalized import paths"""
    
    # Fix interface imports for service implementations
    if 'services/implementations/' in source_file and '../../../interfaces/' in normalized_import:
        normalized_import = normalized_import.replace('../../../interfaces/', '../../interfaces/')
        
    # Fix interface imports to point to services/interfaces/
    if '/services/services/interfaces/' in normalized_import:
        normalized_import = normalized_import.replace('/services/services/interfaces/', '/services/interfaces/')
        
    # Add .ts extension to api.config
    if 'api.config' in normalized_import and not normalized_import.endswith('.ts'):
        normalized_import = normalized_import.replace('api.config', 'api.config.ts')
        
    # Add .ts extension to money-desktop.service
    if 'money-desktop.service' in normalized_import and not normalized_import.endswith('.ts'):
        normalized_import = normalized_import.replace('money-desktop.service', 'money-desktop.service.ts')
        
    return normalized_import

def main():
    # Read the original CSV and create a new one with fixed imports
    with open('processed-imports.csv', 'r') as infile, \
         open('processed-imports-fixed.csv', 'w', newline='') as outfile:
        
        reader = csv.DictReader(infile)
        writer = csv.DictWriter(outfile, fieldnames=reader.fieldnames)
        writer.writeheader()
        
        for row in reader:
            row['Normalized Import'] = fix_import(row['Source File'], row['Normalized Import'])
            writer.writerow(row)
            
    print("Fixed imports written to processed-imports-fixed.csv")

if __name__ == '__main__':
    main()
