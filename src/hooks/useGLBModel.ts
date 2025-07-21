
import { useState, useEffect } from 'react';

export const useGLBModel = (modelPath: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    
    fetch(modelPath, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          setIsLoaded(true);
        } else {
          setHasError(true);
        }
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [modelPath]);

  return { isLoaded, hasError, isLoading };
};
