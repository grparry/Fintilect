# Adaptive Logging Pattern

## Pattern: core/logging
Version: 1.0

## Description
Provides adaptive logging capabilities for AI operations, optimizing between minimal overhead and rich context.

## Rules

```cascade-rules
# Rule: Success Logging
WHEN operation_succeeds
THEN
  - LOG minimal_entry
  - INCLUDE ["timestamp", "pattern", "action", "status"]
  - ENSURE format IS "minimal"
END

# Rule: Failure Logging
WHEN operation_fails
THEN
  - LOG detailed_entry
  - INCLUDE ["timestamp", "pattern", "action", "status", "context", "impact"]
  - CAPTURE context_details
  - ASSESS impact
  - SUGGEST improvements
END

# Rule: Gap Analysis
WHEN pattern_missing OR pattern_ineffective
THEN
  - LOG gap_analysis
  - IDENTIFY missing_functionality
  - SUGGEST similar_patterns
  - ASSESS impact
  - UPDATE gaps.jsonl
END

# Rule: Performance Management
WHEN logging_occurs
THEN
  - CHECK entry_size
  - ENFORCE size_limits
  - USE async_logging
  - ROTATE logs_if_needed
END
```

## Relationships
- MONITORS core/navigation
- VALIDATES core/routing
- SUPPORTS core/security

## Implementation Notes
- Success logs should be minimal to reduce overhead
- Failure logs should provide actionable context
- Gap analysis helps evolve the pattern system
- Performance constraints prevent logging overhead
