#!/bin/bash

echo "Checking for potentially problematic imports..."
echo

echo "1. Duplicate path segments:"
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "from.*\.\.\/.*\.\.\/.*\/" {} \;

echo
echo "2. Remaining @cbp-admin imports:"
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "from.*@cbp-admin" {} \;

echo
echo "3. Absolute paths:"
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "from.*\/.*\/" {} \;
