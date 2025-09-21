import { useCallback } from 'react';

/**
 * Custom hook for keyboard shortcuts
 * Handles all keyboard interactions for QueryEditor
 */
export const useKeyboardShortcuts = (onQueryBuilder, onExecuteQuery) => {
  const handleKeyPress = useCallback((e) => {
    // Ctrl + / - Open Simple Query Builder
    if (e.ctrlKey && e.key === '/') {
      e.preventDefault();
      onQueryBuilder();
    }
    
    // Ctrl + Enter - Execute Query
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      onExecuteQuery();
    }
  }, [onQueryBuilder, onExecuteQuery]);

  return { handleKeyPress };
};
