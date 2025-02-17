# Migration Exceptions

## Direct Transfer Paths
1. Best Practices Directory
   ```yaml
   source: pre-migration/CBPAdmin/.cascade/decisions/todo/best_practice
   destination: {CBPAdmin-new-home}/.cascade/decisions/todo/best_practice
   treatment: verbatim_copy
   rationale: |
     This directory contains simpler content that doesn't follow
     the sophisticated metadata and relationship patterns of the
     core meta layer. It should be preserved as-is without
     attempting to retrofit the more complex patterns.
   ```

## Exception Handling
- Do not attempt to retrofit metadata system
- Preserve original structure and content
- Maintain as separate from core pattern system
- Document as legacy content
