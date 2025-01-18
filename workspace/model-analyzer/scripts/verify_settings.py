#!/usr/bin/env python3
import csv
import os
import re
from pathlib import Path

def load_suspicious_settings():
    """Load our list of suspicious settings."""
    suspicious = {
        'malformed': [
            'Account. ScheduledTransferResult>',
            'Account. string>',
            'BillPay. string>',
            'BusinessBanking. bool>'
        ],
        'test': [
            'Global.MyTestSetting'
        ],
        'certificate': [
            'BillPay.BillMatrix.CertificateStore.Emerge.Private',
            'BillPay.BillMatrix.CertificateStore.Vendor.Public'
        ],
        'typos': [
            # Add any settings with "Finacial" typo
            'FinacialCore.Corelation.AccountTypes',
            'FinacialCore.Corelation.Notes'
        ]
    }
    return suspicious

def scan_legacy_code(settings, legacy_dir, new_models_dir):
    """Scan legacy code and new models for each setting."""
    results = {
        'found_in_legacy': [],
        'found_in_new': [],
        'not_found': [],
        'partial_matches': []
    }
    
    # Flatten settings into a list
    all_settings = []
    for category in settings.values():
        all_settings.extend(category)
    
    # Helper function to scan a directory
    def scan_directory(directory, result_key):
        for root, _, files in os.walk(directory):
            for file in files:
                if file.endswith('.cs') or file.endswith('.ts'):
                    file_path = os.path.join(root, file)
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()
                            
                            # Check each setting
                            for setting in all_settings:
                                # Clean up setting for search
                                clean_setting = setting.replace('>', '').strip()
                                
                                # Look for exact matches
                                if clean_setting in content:
                                    results[result_key].append({
                                        'setting': setting,
                                        'file': os.path.relpath(file_path, directory),
                                        'match_type': 'exact'
                                    })
                                else:
                                    # Look for partial matches (e.g., just the key part)
                                    key_part = clean_setting.split('.')[-1]
                                    if key_part and len(key_part) > 3 and key_part in content:
                                        results['partial_matches'].append({
                                            'setting': setting,
                                            'file': os.path.relpath(file_path, directory),
                                            'matched_part': key_part
                                        })
                    except Exception as e:
                        print(f"Error reading {file_path}: {e}")
    
    # Scan both directories
    scan_directory(legacy_dir, 'found_in_legacy')
    scan_directory(new_models_dir, 'found_in_new')
    
    # Find settings that weren't found anywhere
    found_settings = {r['setting'] for r in results['found_in_legacy']}.union(
        {r['setting'] for r in results['found_in_new']}
    )
    partial_settings = {r['setting'] for r in results['partial_matches']}
    results['not_found'] = [s for s in all_settings if s not in found_settings and s not in partial_settings]
    
    return results

def write_report(results, output_file):
    """Write verification report."""
    with open(output_file, 'w') as f:
        f.write("# Settings Verification Report\n\n")
        
        f.write("## Settings Found in Legacy Code\n")
        for item in sorted(results['found_in_legacy'], key=lambda x: x['setting']):
            f.write(f"- `{item['setting']}`\n")
            f.write(f"  - Found in: `{item['file']}`\n")
            f.write(f"  - Match type: {item['match_type']}\n\n")
        
        f.write("\n## Settings Found in New Models\n")
        for item in sorted(results['found_in_new'], key=lambda x: x['setting']):
            f.write(f"- `{item['setting']}`\n")
            f.write(f"  - Found in: `{item['file']}`\n")
            f.write(f"  - Match type: {item['match_type']}\n\n")
        
        f.write("\n## Partial Matches\n")
        for item in sorted(results['partial_matches'], key=lambda x: x['setting']):
            f.write(f"- `{item['setting']}`\n")
            f.write(f"  - Partial match in: `{item['file']}`\n")
            f.write(f"  - Matched part: `{item['matched_part']}`\n\n")
        
        f.write("\n## Settings Not Found\n")
        for setting in sorted(results['not_found']):
            f.write(f"- `{setting}`\n")
        
        f.write("\n## Summary\n")
        total_settings = len(results['found_in_legacy']) + len(results['found_in_new']) + len(results['partial_matches']) + len(results['not_found'])
        f.write(f"- Total settings checked: {total_settings}\n")
        f.write(f"- Found in legacy code: {len(results['found_in_legacy'])}\n")
        f.write(f"- Found in new models: {len(results['found_in_new'])}\n")
        f.write(f"- Partial matches: {len(results['partial_matches'])}\n")
        f.write(f"- Not found: {len(results['not_found'])}\n")

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(script_dir)
    root_dir = os.path.dirname(os.path.dirname(project_dir))
    
    # Specific directories to check
    legacy_dir = os.path.join(root_dir, 'legacy', 'legacy-apis', 'Psi.Models.ClientConfigurationModels')
    new_models_dir = os.path.join(root_dir, 'cbp-admin', 'src', 'api', 'models')
    
    output_file = os.path.join(project_dir, 'output', 'settings_verification.md')
    
    suspicious_settings = load_suspicious_settings()
    results = scan_legacy_code(suspicious_settings, legacy_dir, new_models_dir)
    write_report(results, output_file)
    print(f"Report written to {output_file}")

if __name__ == '__main__':
    main()
