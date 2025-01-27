#!/bin/bash

# Fix double paths in import statements
find src -type f -name "*.ts*" -exec sed -i '' \
    -e 's|/\.\./\.\./\.\./\.\./types/\([^/]*\)/\.\./types/\([^/]*\)|/../../types/\2|g' \
    -e 's|/\.\./\.\./types/\([^/]*\)/types/\([^/]*\)|/../types/\2|g' \
    -e 's|/\.\./\.\./\.\./types/\([^/]*\)/types/\([^/]*\)|/../../types/\2|g' \
    {} \;
