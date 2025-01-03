---
type: pattern
category: core
status: active
last_validated: 2024-12-31
impacts:
  - patterns/components/common/forms.md
  - patterns/components/common/data-tables.md
  - patterns/components/common/menu-items.md
  - patterns/components/common/dashboard-card.md
---

# Accessibility Standards

## Core Requirements
```yaml
compliance:
  standard: "WCAG 2.1"
  level: "AA"
  focus_areas:
    - Perceivable
    - Operable
    - Understandable
    - Robust

testing:
  tools:
    - Jest-Axe
    - Lighthouse
    - Screen readers
  frequency: "Every PR"
```

## Implementation Patterns
```yaml
semantic_html:
  rules:
    - Use proper heading hierarchy
    - Implement ARIA landmarks
    - Maintain document outline
    - Use semantic elements
  
  components:
    location: "src/components/common"
    patterns:
      - Prefer semantic elements
      - Add ARIA when needed
      - Maintain focus management
      - Support keyboard navigation

form_patterns:
  rules:
    - Label all inputs
    - Provide error feedback
    - Support keyboard navigation
    - Clear instructions
  
  implementation:
    - Associate labels with inputs
    - Describe error states
    - Group related fields
    - Validate accessibility
```

## Focus Management
```yaml
patterns:
  navigation:
    - Logical tab order
    - Focus visible indicators
    - Skip navigation links
    - Focus trapping modals
  
  interaction:
    - Keyboard support
    - Touch targets
    - Focus restoration
    - Loading states

implementation:
  location: "src/hooks/accessibility"
  utilities:
    - useFocusTrap
    - useKeyboardNav
    - useFocusRestore
    - useAnnouncement
```

## Content Guidelines
```yaml
text:
  - Sufficient color contrast
  - Scalable font sizes
  - Clear typography
  - Readable content

media:
  - Alt text for images
  - Captions for video
  - Transcripts for audio
  - No autoplay

interactive:
  - Clear affordances
  - Sufficient timing
  - Error prevention
  - Status messages
```

## Component Requirements
```yaml
common_components:
  Button:
    - Role and state
    - Keyboard activation
    - Loading states
    - Disabled states
  
  Modal:
    - Focus management
    - Escape key handling
    - Focus trap
    - ARIA dialog
  
  Form:
    - Field validation
    - Error messaging
    - Required fields
    - Group labels
  
  Table:
    - Row/column headers
    - Caption/summary
    - Responsive design
    - Sortable headers
```

## Testing Strategy
```yaml
automated:
  - Unit tests with jest-axe
  - Integration tests
  - Lighthouse CI
  - ARIA validation

manual:
  - Screen reader testing
  - Keyboard navigation
  - Color contrast
  - Content review
```
