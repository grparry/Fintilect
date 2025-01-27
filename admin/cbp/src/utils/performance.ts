import React, { ComponentType } from 'react';

type PerformanceFunction<T> = () => T;
type MarkerEndFunction = () => void;
/**
 * Measures the performance of a function execution
 * @param name The name of the operation being measured
 * @param fn The function to measure
 * @returns The result of the function execution
 */
export const measurePerformance = <T>(name: string, fn: PerformanceFunction<T>): T => {
  const start = performance.now();
  const result = fn();
  const duration = performance.now() - start;
  if (duration > 16) { // 16ms = 60fps threshold
    console.warn(`[Performance Warning] Operation '${name}' took ${duration.toFixed(2)}ms`);
  }
  return result;
};
/**
 * Creates a performance marker for measuring duration between start and end points
 * @param markerId The unique identifier for this performance marker
 * @returns A function to end the performance measurement
 */
export const createPerformanceMarker = (markerId: string): MarkerEndFunction => {
  if (window.performance && window.performance.mark) {
    window.performance.mark(`${markerId}-start`);
    return () => {
      window.performance.mark(`${markerId}-end`);
      window.performance.measure(markerId, `${markerId}-start`, `${markerId}-end`);
      const measurements = window.performance.getEntriesByName(markerId);
      const lastMeasurement = measurements[measurements.length - 1];
      if (lastMeasurement.duration > 16) {
        console.warn(`[Performance Warning] Marker '${markerId}' duration: ${lastMeasurement.duration.toFixed(2)}ms`);
      }
    };
  }
  return () => {};
};
/**
 * Higher-order component that tracks render performance of a component
 * @param WrappedComponent The component to track
 * @param componentName The name of the component for logging
 * @returns A wrapped component with performance tracking
 */
export function withPerformanceTracking<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
): React.FC<P> {
  const PerformanceTrackedComponent: React.FC<P> = (props) => {
    console.time(`render-${componentName}`);
    const result = React.createElement(WrappedComponent, props);
    console.timeEnd(`render-${componentName}`);
    return result;
  };
  PerformanceTrackedComponent.displayName = `WithPerformanceTracking(${componentName})`;
  return PerformanceTrackedComponent;
};