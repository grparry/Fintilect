import React, { ComponentType } from 'react';

type PerformanceFunction<T> = () => T;
type MarkerEndFunction = () => void;

/**



/**
 * Measures the performance of a function execution
 * @param name The name of the operation being measured
 * @param fn The function to measure
 * @returns The result of the function execution
 */
  
  

/**
 * Creates a performance marker for measuring duration between start and end points
 * @param markerId The unique identifier for this performance marker
 * @returns A function to end the performance measurement
 */
      
      

/**
 * Higher-order component that tracks render performance of a component
 * @param WrappedComponent The component to track
 * @param componentName The name of the component for logging
 * @returns A wrapped component with performance tracking
 */
): React.FC<P> {

