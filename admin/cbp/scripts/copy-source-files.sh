#!/bin/bash

# Source and destination directories
SRC_DIR="/Users/grantparry/Documents/Fintilect/Fintilect/cbp-admin/src"
DEST_DIR="/Users/grantparry/Documents/Fintilect/Fintilect/admin/cbp/src"

# Create destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Copy TypeScript files preserving directory structure, but only if they don't exist in destination
rsync -av --ignore-existing \
    --include="*/" \
    --include="*.ts" \
    --include="*.tsx" \
    --include="*.d.ts" \
    --include="types/*.types" \
    --include="types/*.types.ts" \
    --include="types/*.types.tsx" \
    --include="types/*.types.d.ts" \
    --exclude="*" \
    "$SRC_DIR/" "$DEST_DIR/"

echo "Files copied from $SRC_DIR to $DEST_DIR"
