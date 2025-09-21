import { useState, useCallback, useMemo, useEffect } from 'react';
import { AVAILABLE_TABLES } from '../constants';

export const useQueryBuilder = () => {
  // State management
  const [selectedTable, setSelectedTable] = useState('');
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [orderBy, setOrderBy] = useState({ column: '', direction: 'ASC' });
  const [limit, setLimit] = useState(100);
  const [joins, setJoins] = useState([]);

  // Get columns for selected table
  const tableColumns = useMemo(() => {
    const table = AVAILABLE_TABLES.find(t => t.name === selectedTable);
    return table ? table.columns : [];
  }, [selectedTable]);

  // Reset when table changes
  useEffect(() => {
    if (selectedTable) {
      setSelectedColumns([]);
      setConditions([]);
      setOrderBy({ column: '', direction: 'ASC' });
    }
  }, [selectedTable]);

  // Handle table selection
  const handleTableSelect = useCallback((tableName) => {
    setSelectedTable(tableName);
  }, []);

  // Handle column selection
  const handleColumnsChange = useCallback((columns) => {
    setSelectedColumns(columns);
  }, []);

  // Handle condition changes
  const addCondition = useCallback(() => {
    setConditions(prev => [...prev, {
      id: Date.now(),
      column: '',
      operator: '=',
      value: '',
      logicalOperator: prev.length > 0 ? 'AND' : ''
    }]);
  }, []);

  const updateCondition = useCallback((id, field, value) => {
    setConditions(prev => prev.map(cond => 
      cond.id === id ? { ...cond, [field]: value } : cond
    ));
  }, []);

  const removeCondition = useCallback((id) => {
    setConditions(prev => prev.filter(cond => cond.id !== id));
  }, []);

  // Handle join operations
  const addJoin = useCallback(() => {
    if (joins.length >= 3) {
      return;
    }
    
    setJoins(prev => [...prev, {
      id: Date.now(),
      table: '',
      columns: [],
      leftColumn: '',
      rightColumn: '',
      joinType: 'LEFT JOIN'
    }]);
  }, [joins.length]);

  const updateJoin = useCallback((id, field, value) => {
    setJoins(prev => prev.map(join => 
      join.id === id ? { ...join, [field]: value } : join
    ));
  }, []);

  const removeJoin = useCallback((id) => {
    setJoins(prev => prev.filter(join => join.id !== id));
  }, []);

  // Handle order by changes
  const handleOrderByChange = useCallback((field, value) => {
    setOrderBy(prev => ({ ...prev, [field]: value }));
  }, []);

  // Handle limit changes
  const handleLimitChange = useCallback((newLimit) => {
    setLimit(newLimit);
  }, []);

  return {
    // State
    selectedTable,
    selectedColumns,
    conditions,
    orderBy,
    limit,
    joins,
    tableColumns,
    
    // Handlers
    handleTableSelect,
    handleColumnsChange,
    addCondition,
    updateCondition,
    removeCondition,
    addJoin,
    updateJoin,
    removeJoin,
    handleOrderByChange,
    handleLimitChange
  };
};
