import { useState, useCallback } from 'react';

export const useQueryValidation = (selectedTable, selectedColumns, joins, conditions) => {
  const [errorMessage, setErrorMessage] = useState('');

  const validateQuery = useCallback(() => {
    setErrorMessage('');
    
    if (!selectedTable) {
      setErrorMessage('Please select a table to query from.');
      return false;
    }
    
    if (selectedColumns.length === 0) {
      setErrorMessage('Please select at least one column to display in your results.');
      return false;
    }
    
    // Check for incomplete joins
    const incompleteJoins = joins.filter(join => 
      join.table && (!join.leftColumn || !join.rightColumn)
    );
    
    if (incompleteJoins.length > 0) {
      setErrorMessage('Please complete all join relationships. Make sure to select both columns for each join.');
      return false;
    }
    
    // Check for incomplete conditions
    const incompleteConditions = conditions.filter(cond => 
      cond.column && cond.operator && !cond.value.trim()
    );
    
    if (incompleteConditions.length > 0) {
      setErrorMessage('Please complete all filter conditions. Make sure to enter values for all conditions.');
      return false;
    }
    
    return true;
  }, [selectedTable, selectedColumns, joins, conditions]);

  const clearError = useCallback(() => {
    setErrorMessage('');
  }, []);

  return {
    errorMessage,
    validateQuery,
    clearError,
    setErrorMessage
  };
};
