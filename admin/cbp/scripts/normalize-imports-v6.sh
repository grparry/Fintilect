#!/bin/bash

# Simple string replacements
find ./src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' -e "s/from '@\//from '.\//g" -e 's/from "@\//from ".\//g' {} +

echo "Import statements have been normalized!"
