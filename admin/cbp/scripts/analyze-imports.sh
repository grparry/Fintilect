#!/bin/bash

echo "Analyzing @cbp-admin imports..."
echo

echo "1. Imports using @cbp-admin/../ (these should all be converted to relative paths):"
grep -r "from '@cbp-admin/../" src | sort

echo
echo "2. Imports using @cbp-admin/ without ../ (need to check if internal or external):"
grep -r "from '@cbp-admin/" src | grep -v "from '@cbp-admin/../" | sort

echo
echo "3. Imports using @cbp-admin/../../ (likely external references):"
grep -r "from '@cbp-admin/../../" src | sort
