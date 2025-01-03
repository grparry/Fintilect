import React, { useEffect, useRef } from 'react';
import { GlobalProfilerProps } from '../../types/components.types';

const GlobalProfiler = ({
  children,
  className,
  style,
  enabled = true,
  onMeasurement,
}: React.PropsWithChildren<GlobalProfilerProps>) => {
  const startTimeRef = useRef<number>(0);
  const componentNameRef = useRef<string>('');

  useEffect(() => {
    if (!enabled) return;

    try {
      // Get component name from children if possible
      const childComponent = React.Children.only(children) as React.ReactElement;
      const componentType = childComponent?.type as any;
      
      componentNameRef.current = 
        typeof componentType === 'function' ? componentType.name :
        typeof componentType === 'object' && componentType !== null && 'displayName' in componentType ? componentType.displayName :
        'Unknown';
    } catch {
      componentNameRef.current = 'Unknown';
    }

    // Record mount time
    startTimeRef.current = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTimeRef.current;
      
      onMeasurement?.({
        componentName: componentNameRef.current,
        phase: 'mount',
        duration,
        timestamp: Date.now(),
      });
    };
  }, [enabled, onMeasurement]);

  useEffect(() => {
    if (!enabled) return;

    // Record update time
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      onMeasurement?.({
        componentName: componentNameRef.current,
        phase: 'update',
        duration,
        timestamp: Date.now(),
      });
    };
  }, [enabled, onMeasurement]); 

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default GlobalProfiler;
