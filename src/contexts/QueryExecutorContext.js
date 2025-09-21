import React, { createContext, useContext, useCallback, useState, useMemo } from 'react';
import {
  MOCK_USERS_DATA,
  MOCK_GENERIC_DATA,
  EXECUTION_TIME_RANGES,
  generateLargeDataset
} from '../constants';

// Mock SQL executor - in real app this would connect to actual database
const mockSqlExecutor = async (query) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
  
  const normalizedQuery = query.toLowerCase().trim();
  // Mock different responses based on query
  if (normalizedQuery.includes('users')) {
    return {
      data: MOCK_USERS_DATA,
      executionTime: Math.floor(Math.random() * (EXECUTION_TIME_RANGES.USERS.max - EXECUTION_TIME_RANGES.USERS.min) + EXECUTION_TIME_RANGES.USERS.min)
    };
  } else if (normalizedQuery.includes('data_table')) {
    // Large dataset for testing if app crashes trying to load large dataset
    const largeData = generateLargeDataset();
    
    return {
      data: largeData,
      executionTime: Math.floor(Math.random() * (EXECUTION_TIME_RANGES.LARGE_DATASET.max - EXECUTION_TIME_RANGES.LARGE_DATASET.min) + EXECUTION_TIME_RANGES.LARGE_DATASET.min)
    };
  } else {
    // Generic response for other queries
    return {
      data: MOCK_GENERIC_DATA,
      executionTime: Math.floor(Math.random() * (EXECUTION_TIME_RANGES.GENERIC.max - EXECUTION_TIME_RANGES.GENERIC.min) + EXECUTION_TIME_RANGES.GENERIC.min)
    };
  }
};

// Separate contexts for different concerns
const QueryActionsContext = createContext();
const QueryLoadingContext = createContext();
const QueryResultsContext = createContext();

export const QueryExecutorProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [executionTime, setExecutionTime] = useState(null);
  

  const executeQuery = useCallback(async (query) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Execute query
      const result = await mockSqlExecutor(query);      
      setResults(result.data);
      setExecutionTime(result.executionTime);
    } catch (err) {
      setError(err.message || 'An error occurred while executing the query');
      setResults(null);
      setExecutionTime(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults(null);
    setError(null);
    setExecutionTime(null);
  }, []);

  // Memoize context values to prevent unnecessary re-renders
  const actionsValue = useMemo(() => ({
    executeQuery,
    clearResults
  }), [executeQuery, clearResults]);

  const loadingValue = useMemo(() => ({
    isLoading
  }), [isLoading]);

  const resultsValue = useMemo(() => ({
    results,
    error,
    executionTime
  }), [results, error, executionTime]);

  return (
    <QueryActionsContext.Provider value={actionsValue}>
      <QueryLoadingContext.Provider value={loadingValue}>
        <QueryResultsContext.Provider value={resultsValue}>
          {children}
        </QueryResultsContext.Provider>
      </QueryLoadingContext.Provider>
    </QueryActionsContext.Provider>
  );
};

// Specific hooks for different concerns
export const useQueryActions = () => {
  const context = useContext(QueryActionsContext);
  if (!context) {
    throw new Error('useQueryActions must be used within a QueryExecutorProvider');
  }
  return context;
};

export const useQueryLoading = () => {
  const context = useContext(QueryLoadingContext);
  if (!context) {
    throw new Error('useQueryLoading must be used within a QueryExecutorProvider');
  }
  return context;
};

export const useQueryResults = () => {
  const context = useContext(QueryResultsContext);
  if (!context) {
    throw new Error('useQueryResults must be used within a QueryExecutorProvider');
  }
  return context;
};

export const useQueryExecutorContext = () => {
  const actions = useQueryActions();
  const loading = useQueryLoading();
  const results = useQueryResults();
  
  return {
    ...actions,
    ...loading,
    ...results
  };
};

export default QueryActionsContext;