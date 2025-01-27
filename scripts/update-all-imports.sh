#!/bin/bash

# Find all TypeScript files excluding node_modules, dist, .git, and infrastructure/models
find . -type f \( -name "*.ts" -o -name "*.tsx" \) \
  ! -path "*/node_modules/*" \
  ! -path "*/dist/*" \
  ! -path "*/.git/*" \
  ! -path "*/infrastructure/src/models/*" \
  -print0 | xargs -0 npx ts-node scripts/update-imports.ts
