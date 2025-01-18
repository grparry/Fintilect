#!/usr/bin/env python3
import csv
import json
import os
from pathlib import Path
from typing import Dict, List, Set

def load_legacy_data(csv_path: str) -> Dict[str, List[dict]]:
    """Load legacy data from CSV file, grouped by namespace."""
    namespaces = {}
    with open(csv_path, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            namespace = '.'.join(row['Namespace.Class'].split('.')[:-1])  # Remove class name
            if namespace not in namespaces:
                namespaces[namespace] = []
            namespaces[namespace].append(row)
    return namespaces

def load_json_models(models_dir: str) -> Dict[str, List[str]]:
    """Load all JSON model files and their fields."""
    models = {}
    for root, _, files in os.walk(models_dir):
        for file in files:
            if file.endswith('.json'):
                rel_path = os.path.relpath(os.path.join(root, file), models_dir)
                with open(os.path.join(root, file), 'r') as f:
                    try:
                        data = json.load(f)
                        # Extract all field names recursively
                        fields = set()
                        def extract_fields(obj, prefix=''):
                            if isinstance(obj, dict):
                                for k, v in obj.items():
                                    fields.add(f"{prefix}{k}")
                                    extract_fields(v, f"{prefix}{k}.")
                            elif isinstance(obj, list) and obj and isinstance(obj[0], dict):
                                extract_fields(obj[0], prefix)
                        extract_fields(data)
                        models[rel_path] = sorted(list(fields))
                    except json.JSONDecodeError:
                        print(f"Error loading {rel_path}")
    return models

def write_missing_settings_report(missing_settings: Dict[str, List[dict]], output_path: str) -> None:
    """Write missing settings to a CSV file with context from legacy data."""
    with open(output_path, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['Namespace', 'SettingKey', 'Description', 'DataType', 'Source'])
        
        for namespace, settings in missing_settings.items():
            for setting in settings:
                writer.writerow([
                    namespace,
                    setting['SettingKey'],
                    setting.get('Description', ''),
                    setting.get('DataType', ''),
                    setting.get('Source', '')
                ])

def analyze_coverage(namespaces: Dict[str, List[dict]], models: Dict[str, List[str]]) -> None:
    """Analyze coverage between legacy namespaces and JSON models."""
    print("\n=== Namespace Coverage Analysis ===\n")
    
    # Track settings found and missing
    found_settings = set()
    missing_settings = {}
    
    # For each namespace
    for namespace, fields in namespaces.items():
        print(f"\nNamespace: {namespace}")
        print("-" * (len(namespace) + 11))
        
        # Get all setting keys for this namespace
        setting_keys = {f['SettingKey']: f for f in fields if f['SettingKey']}
        if not setting_keys:
            print("No setting keys found in legacy data")
            continue
            
        # Look for these settings in JSON models
        found_in_models = set()
        locations = {}
        
        for model_path, model_fields in models.items():
            for setting_key, setting_data in setting_keys.items():
                if any(field.lower().endswith(setting_key.lower().split('.')[-1]) for field in model_fields):
                    found_in_models.add(setting_key)
                    if setting_key not in locations:
                        locations[setting_key] = []
                    locations[setting_key].append(model_path)
        
        # Report findings
        if found_in_models:
            print("\nFound settings:")
            for setting in sorted(found_in_models):
                print(f"  - {setting}")
                print(f"    Located in: {', '.join(locations[setting])}")
            found_settings.update(found_in_models)
            
        missing = set(setting_keys.keys()) - found_in_models
        if missing:
            print("\nMissing settings:")
            missing_settings[namespace] = []
            for setting in sorted(missing):
                print(f"  - {setting}")
                missing_settings[namespace].append(setting_keys[setting])
    
    # Write detailed report of missing settings
    output_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'output', 'missing_settings.csv')
    write_missing_settings_report(missing_settings, output_path)
    
    # Overall statistics
    print("\n=== Overall Statistics ===\n")
    total_settings = len(found_settings) + sum(len(settings) for settings in missing_settings.values())
    if total_settings > 0:
        coverage = (len(found_settings) / total_settings) * 100
        print(f"Total settings: {total_settings}")
        print(f"Found settings: {len(found_settings)}")
        print(f"Missing settings: {sum(len(settings) for settings in missing_settings.values())}")
        print(f"Coverage: {coverage:.1f}%")
        print(f"\nDetailed report of missing settings written to: {output_path}")

def main():
    # Paths
    csv_path = '/Users/grantparry/Documents/Fintilect/Fintilect/workspace/legacy-analyzer/output/legacy_field_data_sorted.csv'
    models_dir = '/Users/grantparry/Documents/Fintilect/Fintilect/cbp-admin/src/api/models'
    
    # Load data
    print("Loading legacy data...")
    namespaces = load_legacy_data(csv_path)
    
    print("Loading JSON models...")
    models = load_json_models(models_dir)
    
    # Analyze
    analyze_coverage(namespaces, models)

if __name__ == '__main__':
    main()
