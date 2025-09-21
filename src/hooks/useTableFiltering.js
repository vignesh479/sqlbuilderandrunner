import { useState, useMemo, useCallback } from 'react';

/**
 * Custom hook for table filtering logic
 */
export const useTableFiltering = (data) => {
  const [filters, setFilters] = useState({});

  // Apply filters to data
  const filteredData = useMemo(() => {
    if (!data || data.length === 0 || Object.keys(filters).length === 0) {
      return data;
    }
    /*
     actually send the filters to server and return the filtered data
    const filteredData = await fetch('/api/filter', {
      method: 'POST',
      body: JSON.stringify(filters)
    }); 
    */
    return data;
  }, [data, filters]);

  const applyFilters = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const activeFilterCount = useMemo(() => {
    return Object.values(filters).filter(filter => filter.enabled && filter.value).length;
  }, [filters]);

  return {
    filteredData,
    filters,
    applyFilters,
    clearFilters,
    activeFilterCount
  };
};
