import { useState, useCallback } from 'react';

/**
 * Custom hook for filter validation logic
 * Handles validation of search/filter inputs with various data types and operators
 */
export const useFilterValidation = () => {
  const [errors, setErrors] = useState({});

  const validateFilters = useCallback((filters) => {
    const newErrors = {};
    let hasErrors = false;

    Object.entries(filters).forEach(([column, filter]) => {
      if (filter.enabled) {
        // Check if main value is provided
        if (!filter.value || filter.value.trim() === '') {
          newErrors[column] = 'Please enter a value for this filter';
          hasErrors = true;
          return; // Skip further validation for this filter
        }
        if (filter.operator === 'BETWEEN' && (!filter.value2 || filter.value2.trim() === '')) {
          newErrors[column] = 'Please enter both "From" and "To" values for range filter';
          hasErrors = true;
          return; // Skip further validation for this filter
        }
        // More type specific validation for other operators goes here
      }
    });

    setErrors(newErrors);
    return !hasErrors;
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((column) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[column];
      return newErrors;
    });
  }, []);

  const setFieldError = useCallback((column, message) => {
    setErrors(prev => ({
      ...prev,
      [column]: message
    }));
  }, []);

  return {
    errors,
    validateFilters,
    clearErrors,
    clearFieldError,
    setFieldError
  };
};
