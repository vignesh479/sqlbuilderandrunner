import { useState, useCallback, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { useQueryActions } from '../contexts/QueryExecutorContext';

/**
 * Custom hook for QueryEditor state and business logic
 * Separates business logic from UI rendering
 */
export const useQueryEditor = () => {
  const { executeQuery } = useQueryActions();
  
  // State management
  const [query, setQuery] = useState('SELECT * FROM users LIMIT 10;');
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [showQueryBuilder, setShowQueryBuilder] = useState(false);

  // Debounced validation
  const debouncedValidation = useMemo(
    () => debounce((queryText) => {
      if (queryText.trim() && !queryText.toLowerCase().includes('select')) {
        setError('Query should start with SELECT statement');
      } else {
        setError('');
      }
    }, 500),
    []
  );

  // Event handlers
  const handleQueryChange = useCallback((e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedValidation(newQuery);
  }, [debouncedValidation]);

  const handleQueryExecute = useCallback((queryToExecute) => {
    // Use provided query or fall back to current query state
    const queryText = queryToExecute && typeof queryToExecute === 'string' ? queryToExecute : query;
    
    if (queryText && queryText.trim()) {
      executeQuery(queryText);
      setIsExpanded(false); // Auto-collapse after execution
    }
  }, [executeQuery, query]);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  // Query builder handlers
  const openQueryBuilder = useCallback(() => {
    setShowQueryBuilder(true);
  }, []);

  const closeQueryBuilder = useCallback(() => {
    setShowQueryBuilder(false);
  }, []);

  const handleQueryGenerated = useCallback((generatedQuery) => {
    setQuery(generatedQuery);
    setShowQueryBuilder(false);
    // Auto-execute generated query
    setTimeout(() => handleQueryExecute(generatedQuery), 100);
  }, [handleQueryExecute]);

  // History selection
  const selectFromHistory = useCallback((selectedQuery) => {
    setQuery(selectedQuery);
  }, []);

  // Formatted query for collapsed view
  const formattedQuery = useMemo(() => {
    return query.trim().slice(0, 100) + (query.trim().length > 100 ? '...' : '');
  }, [query]);

  // Expose imperative methods for ref
  const imperativeHandlers = useMemo(() => ({
    setQuery: (newQuery) => setQuery(newQuery)
  }), []);

  return {
    // State
    query,
    error,
    isExpanded,
    showQueryBuilder,
    formattedQuery,
    
    // Handlers
    handleQueryChange,
    handleQueryExecute,
    toggleExpanded,
    openQueryBuilder,
    closeQueryBuilder,
    handleQueryGenerated,
    selectFromHistory,
    
    // Imperative methods
    imperativeHandlers
  };
};
