# Accessibility TODO

## Overview
This TODO tracks the necessary changes to improve accessibility across the codebase.

**Created**: 2024-12-31T06:06:12-07:00
**Status**: Pending
**Priority**: High
**Category**: Accessibility
**Related Pattern**: core/accessibility.md

## Current Issues

### 1. ARIA Support
- **Issue**: Incomplete ARIA
- **Current**: Basic attributes
- **Required**: Full ARIA
- **Impact**: Poor accessibility

### 2. Keyboard Navigation
- **Issue**: Limited keyboard
- **Current**: Basic support
- **Required**: Full support
- **Impact**: Poor navigation

### 3. Color Contrast
- **Issue**: Inconsistent contrast
- **Current**: Basic colors
- **Required**: WCAG 2.1
- **Impact**: Poor visibility

### 4. Screen Readers
- **Issue**: Limited support
- **Current**: Basic text
- **Required**: Full support
- **Impact**: Poor usability

### 5. Focus Management
- **Issue**: Basic focus
- **Current**: Default behavior
- **Required**: Enhanced focus
- **Impact**: Poor interaction

## Required Changes

### 1. Accessibility Provider
```typescript
// src/accessibility/AccessibilityProvider.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityState {
  highContrast: boolean;
  fontSize: number;
  reducedMotion: boolean;
  screenReader: boolean;
}

interface AccessibilityContextType extends AccessibilityState {
  setHighContrast: (enabled: boolean) => void;
  setFontSize: (size: number) => void;
  setReducedMotion: (enabled: boolean) => void;
  setScreenReader: (enabled: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export const AccessibilityProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<AccessibilityState>({
    highContrast: false,
    fontSize: 16,
    reducedMotion: false,
    screenReader: false,
  });

  useEffect(() => {
    // Apply accessibility settings
    document.documentElement.style.setProperty('--font-size-base', `${state.fontSize}px`);
    document.documentElement.classList.toggle('high-contrast', state.highContrast);
    document.documentElement.classList.toggle('reduced-motion', state.reducedMotion);
    document.documentElement.setAttribute('aria-screenreader', state.screenReader.toString());
  }, [state]);

  const value = {
    ...state,
    setHighContrast: (enabled: boolean) => 
      setState(prev => ({ ...prev, highContrast: enabled })),
    setFontSize: (size: number) => 
      setState(prev => ({ ...prev, fontSize: size })),
    setReducedMotion: (enabled: boolean) => 
      setState(prev => ({ ...prev, reducedMotion: enabled })),
    setScreenReader: (enabled: boolean) => 
      setState(prev => ({ ...prev, screenReader: enabled })),
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
```

### 2. Focus Management
```typescript
// src/accessibility/FocusManager.tsx
import React, { useRef, useEffect } from 'react';

interface FocusManagerProps {
  active?: boolean;
  children: React.ReactNode;
  onEscape?: () => void;
  returnFocus?: boolean;
}

export const FocusManager: React.FC<FocusManagerProps> = ({
  active = true,
  children,
  onEscape,
  returnFocus = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (active) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      containerRef.current?.focus();
    }

    return () => {
      if (returnFocus && previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [active, returnFocus]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!active) return;

    if (event.key === 'Escape' && onEscape) {
      onEscape();
      return;
    }

    if (event.key === 'Tab') {
      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      style={{ outline: 'none' }}
    >
      {children}
    </div>
  );
};
```

### 3. Color Contrast
```typescript
// src/accessibility/ColorContrast.tsx
import { useTheme } from '@mui/material/styles';

interface ColorContrastOptions {
  minimumRatio?: number;
  preferredRatio?: number;
}

export const useColorContrast = (options: ColorContrastOptions = {}) => {
  const theme = useTheme();
  const {
    minimumRatio = 4.5,
    preferredRatio = 7,
  } = options;

  const getLuminance = (color: string): number => {
    const rgb = color.startsWith('#')
      ? [
          parseInt(color.slice(1, 3), 16),
          parseInt(color.slice(3, 5), 16),
          parseInt(color.slice(5, 7), 16),
        ]
      : color
          .match(/\d+/g)
          ?.map(Number) || [0, 0, 0];

    const [r, g, b] = rgb.map(value => {
      value /= 255;
      return value <= 0.03928
        ? value / 12.92
        : Math.pow((value + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const getContrastRatio = (color1: string, color2: string): number => {
    const l1 = getLuminance(color1);
    const l2 = getLuminance(color2);
    const lightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return (lightest + 0.05) / (darkest + 0.05);
  };

  const findBestContrast = (
    baseColor: string,
    options: string[]
  ): string => {
    return options.reduce((best, current) => {
      const currentRatio = getContrastRatio(baseColor, current);
      const bestRatio = getContrastRatio(baseColor, best);

      if (currentRatio >= preferredRatio) return current;
      if (bestRatio >= preferredRatio) return best;
      
      return currentRatio > bestRatio ? current : best;
    });
  };

  return {
    getContrastRatio,
    findBestContrast,
    isAccessible: (color1: string, color2: string) =>
      getContrastRatio(color1, color2) >= minimumRatio,
  };
};
```

### 4. Screen Reader
```typescript
// src/accessibility/ScreenReader.tsx
import React from 'react';

interface ScreenReaderProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  visible?: boolean;
}

export const ScreenReader: React.FC<ScreenReaderProps> = ({
  children,
  as: Component = 'span',
  visible = false,
}) => {
  const style = visible
    ? undefined
    : {
        position: 'absolute' as const,
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        border: 0,
      };

  return <Component style={style}>{children}</Component>;
};

interface LiveRegionProps {
  children: React.ReactNode;
  'aria-live'?: 'polite' | 'assertive' | 'off';
  'aria-atomic'?: boolean;
  'aria-relevant'?: 'additions' | 'removals' | 'text' | 'all';
}

export const LiveRegion: React.FC<LiveRegionProps> = ({
  children,
  'aria-live': ariaLive = 'polite',
  'aria-atomic': ariaAtomic = true,
  'aria-relevant': ariaRelevant = 'additions text',
}) => {
  return (
    <div
      aria-live={ariaLive}
      aria-atomic={ariaAtomic}
      aria-relevant={ariaRelevant}
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        border: 0,
      }}
    >
      {children}
    </div>
  );
};
```

### 5. Keyboard Navigation
```typescript
// src/accessibility/KeyboardNavigation.tsx
import React, { useRef, useEffect, useState } from 'react';

interface KeyboardNavigationProps {
  children: React.ReactNode;
  vertical?: boolean;
  horizontal?: boolean;
  wrap?: boolean;
  onSelect?: (index: number) => void;
}

export const KeyboardNavigation: React.FC<KeyboardNavigationProps> = ({
  children,
  vertical = true,
  horizontal = false,
  wrap = true,
  onSelect,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusIndex, setFocusIndex] = useState<number>(-1);

  const getFocusableElements = () => {
    if (!containerRef.current) return [];
    return Array.from(
      containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const elements = getFocusableElements();
    if (!elements.length) return;

    let nextIndex = focusIndex;

    switch (event.key) {
      case 'ArrowDown':
        if (!vertical) return;
        event.preventDefault();
        nextIndex = focusIndex + 1;
        break;
      case 'ArrowUp':
        if (!vertical) return;
        event.preventDefault();
        nextIndex = focusIndex - 1;
        break;
      case 'ArrowRight':
        if (!horizontal) return;
        event.preventDefault();
        nextIndex = focusIndex + 1;
        break;
      case 'ArrowLeft':
        if (!horizontal) return;
        event.preventDefault();
        nextIndex = focusIndex - 1;
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        nextIndex = elements.length - 1;
        break;
      case 'Enter':
      case ' ':
        if (focusIndex >= 0 && onSelect) {
          event.preventDefault();
          onSelect(focusIndex);
        }
        return;
      default:
        return;
    }

    if (wrap) {
      nextIndex = nextIndex < 0 
        ? elements.length - 1 
        : nextIndex >= elements.length 
          ? 0 
          : nextIndex;
    } else {
      nextIndex = Math.max(0, Math.min(nextIndex, elements.length - 1));
    }

    if (nextIndex !== focusIndex && elements[nextIndex]) {
      setFocusIndex(nextIndex);
      elements[nextIndex].focus();
    }
  };

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      role="group"
      style={{ outline: 'none' }}
    >
      {children}
    </div>
  );
};
```

## Implementation Plan

1. **Phase 1: ARIA**
   - Add ARIA labels
   - Add ARIA roles
   - Add ARIA states
   - Add descriptions

2. **Phase 2: Keyboard**
   - Add focus management
   - Add key handlers
   - Add navigation
   - Add shortcuts

3. **Phase 3: Colors**
   - Add contrast
   - Add themes
   - Add modes
   - Add testing

4. **Phase 4: Screen**
   - Add reader support
   - Add live regions
   - Add announcements
   - Add descriptions

5. **Phase 5: Focus**
   - Add focus trap
   - Add focus ring
   - Add skip links
   - Add indicators

## Notes
- Use WCAG 2.1
- Add testing
- Document patterns
- Consider scale
- Handle edge cases
