"use client";

import { useState, useCallback } from "react";

export interface UseApiCallOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
  initialLoading?: boolean;
}

/**
 * Custom hook for executing API calls with automatic try/catch/finally loading and error management.
 * Set loading to true when try block starts, and false in finally block.
 */
export function useApiCall<T = any, Args extends any[] = any[]>(
  apiFunction: (...args: Args) => Promise<T>,
  options: UseApiCallOptions<T> = {}
) {
  const [isLoading, setIsLoading] = useState<boolean>(options.initialLoading || false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(
    async (...args: Args): Promise<T | undefined> => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await apiFunction(...args);
        setData(result);
        options.onSuccess?.(result);
        return result;
      } catch (err: any) {
        const errorMessage =
          err?.response?.data?.message || err?.message || "An unexpected error occurred.";
        setError(errorMessage);
        options.onError?.(err);
        return undefined;
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction, options]
  );

  return {
    execute,
    isLoading,
    error,
    data,
    setIsLoading,
    setError,
  };
}

export default useApiCall;
