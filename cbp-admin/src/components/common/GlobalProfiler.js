import React, { Profiler } from 'react';

const GlobalProfiler = ({ id, children }) => {
  const onRenderCallback = (
    profilerId,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
  ) => {
    // Performance threshold (16ms = 60fps)
    const PERFORMANCE_THRESHOLD = 16;
    
    if (actualDuration > PERFORMANCE_THRESHOLD) {
      console.warn(`[Performance Warning] Slow render detected in ${profilerId}:`, {
        phase,
        actualDuration: `${actualDuration.toFixed(2)}ms`,
        baseDuration: `${baseDuration.toFixed(2)}ms`,
        startTime,
        commitTime,
        interactions
      });
    }

    // Log to performance monitoring service (if available)
    if (window.performance && window.performance.mark) {
      window.performance.mark(`${profilerId}-${phase}-end`);
      
      // You can send this data to your analytics service
      // Example: sendToAnalytics({ profilerId, phase, actualDuration });
    }
  };

  return (
    <Profiler id={id} onRender={onRenderCallback}>
      {children}
    </Profiler>
  );
};

export default GlobalProfiler;
