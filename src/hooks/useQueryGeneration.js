import { useMemo } from 'react';

export const useQueryGeneration = (selectedTable, selectedColumns, joins, conditions, orderBy, limit) => {
  const generatedQuery = useMemo(() => {
    if (!selectedTable || selectedColumns.length === 0) {
      return '';
    }

    // Format column selections with table aliases for clarity
    const formatColumns = () => {
      // Main table columns
      const mainTableColumns = selectedColumns.map(col => `${selectedTable}.${col}`);
      
      // Join table columns
      const joinTableColumns = joins.flatMap(join => 
        join.table && join.columns.length > 0 
          ? join.columns.map(col => `${join.table}.${col}`)
          : []
      );
      
      // Combine all columns
      return [...mainTableColumns, ...joinTableColumns].join(', ');
    };

    // Start building the query
    let query = `SELECT ${formatColumns()}\nFROM ${selectedTable}`;
    
    // Add JOIN clauses
    if (joins.length > 0) {
      const validJoins = joins.filter(join => 
        join.table && join.leftColumn && join.rightColumn
      );
      
      validJoins.forEach(join => {
        query += `\n${join.joinType} ${join.table} ON ${selectedTable}.${join.leftColumn} = ${join.table}.${join.rightColumn}`;
      });
    }

    // Add WHERE conditions
    if (conditions.length > 0) {
      const validConditions = conditions.filter(cond => 
        cond.column && cond.operator && cond.value
      );
      
      if (validConditions.length > 0) {
        query += '\nWHERE ';
        query += validConditions.map((cond, index) => {
          let conditionStr = index > 0 ? `${cond.logicalOperator} ` : '';
          
          // Check if column contains table reference
          const columnRef = cond.column.includes('.') ? cond.column : `${selectedTable}.${cond.column}`;
          
          if (cond.operator === 'LIKE' || cond.operator === 'NOT LIKE') {
            conditionStr += `${columnRef} ${cond.operator} '%${cond.value}%'`;
          } else if (cond.operator === 'BETWEEN') {
            const values = cond.value.split(',').map(v => v.trim());
            conditionStr += `${columnRef} BETWEEN '${values[0]}' AND '${values[1] || values[0]}'`;
          } else {
            conditionStr += `${columnRef} ${cond.operator} '${cond.value}'`;
          }
          
          return conditionStr;
        }).join(' ');
      }
    }

    // Add ORDER BY
    if (orderBy.column) {
      const orderByColumn = orderBy.column.includes('.') ? orderBy.column : `${selectedTable}.${orderBy.column}`;
      query += `\nORDER BY ${orderByColumn} ${orderBy.direction}`;
    }

    // Add LIMIT
    if (limit > 0) {
      query += `\nLIMIT ${limit}`;
    }

    return query + ';';
  }, [selectedTable, selectedColumns, joins, conditions, orderBy, limit]);

  return { generatedQuery };
};
