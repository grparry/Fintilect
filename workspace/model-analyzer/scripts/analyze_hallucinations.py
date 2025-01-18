#!/usr/bin/env python3
import csv
import re
import os
from collections import defaultdict

def analyze_settings(csv_path):
    """Analyze settings for potential hallucinations."""
    with open(csv_path, 'r') as f:
        reader = csv.DictReader(f)
        settings = list(reader)

    potential_hallucinations = []
    
    # Patterns that might indicate hallucinations
    patterns = {
        'malformed_type': r', \w+>$',  # Ends with ", TypeName>"
        'test_settings': r'test|dummy|example',  # Contains test-related words
        'typos': r'Finacial|Restriced|Houshold',  # Common typos
        'invalid_chars': r'[^a-zA-Z0-9._]',  # Contains invalid characters
    }

    for setting in settings:
        key = setting['SettingKey']
        reasons = []

        # Check for malformed type definitions
        if re.search(patterns['malformed_type'], key, re.IGNORECASE):
            reasons.append('Malformed type definition')
            
        # Check for test settings
        if re.search(patterns['test_settings'], key, re.IGNORECASE):
            reasons.append('Test/dummy setting')
            
        # Check for common typos
        if re.search(patterns['typos'], key):
            reasons.append('Contains typo')
            
        # Check for invalid characters
        if re.search(patterns['invalid_chars'], key):
            reasons.append('Contains invalid characters')

        if reasons:
            potential_hallucinations.append({
                'namespace': setting['Namespace'],
                'key': key,
                'reasons': reasons
            })

    # Write report
    output_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'output')
    output_file = os.path.join(output_dir, 'potential_hallucinations.md')
    
    with open(output_file, 'w') as f:
        f.write('# Potential AI Hallucinations\n\n')
        
        # Group by namespace
        by_namespace = defaultdict(list)
        for item in potential_hallucinations:
            by_namespace[item['namespace']].append(item)
            
        for namespace, items in by_namespace.items():
            f.write(f'## {namespace}\n\n')
            for item in items:
                f.write(f'- `{item["key"]}`\n')
                f.write(f'  - Reasons: {", ".join(item["reasons"])}\n\n')

if __name__ == '__main__':
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(script_dir)
    csv_path = os.path.join(project_dir, 'output', 'missing_settings.csv')
    analyze_settings(csv_path)
