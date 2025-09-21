import React, { useCallback } from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
import { useQueryBuilder } from '../../hooks/useQueryBuilder';
import { useQueryValidation } from '../../hooks/useQueryValidation';
import { useQueryGeneration } from '../../hooks/useQueryGeneration';
import useFocusTrap from '../../hooks/useFocusTrap';
import TableSelectionCard from './TableSelectionCard';
import ConditionsCard from './ConditionsCard';
import SortingAndLimitsCard from './SortingAndLimitsCard';
import QueryPreviewCard from './QueryPreviewCard';


const SimpleQueryBuilder = React.memo(({ show, onHide, onQueryGenerated }) => {
  // Focus trap for modal accessibility
  const { containerRef } = useFocusTrap(show);

  // Use custom hooks for state management and logic
  const {
    selectedTable,
    selectedColumns,
    conditions,
    orderBy,
    limit,
    joins,
    tableColumns,
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
  } = useQueryBuilder();

  const { errorMessage, validateQuery, clearError } = useQueryValidation(
    selectedTable,
    selectedColumns,
    joins,
    conditions
  );

  const { generatedQuery } = useQueryGeneration(
    selectedTable,
    selectedColumns,
    joins,
    conditions,
    orderBy,
    limit
  );

  // Handle query generation
  const handleGenerateQuery = useCallback(() => {
    if (validateQuery()) {
      onQueryGenerated(generatedQuery);
      onHide();
    }
  }, [validateQuery, generatedQuery, onQueryGenerated, onHide]);

  // Enhanced handlers that clear errors
  const onTableSelect = useCallback((tableName) => {
    handleTableSelect(tableName);
    clearError();
  }, [handleTableSelect, clearError]);

  const onColumnsChange = useCallback((columns) => {
    handleColumnsChange(columns);
    clearError();
  }, [handleColumnsChange, clearError]);

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <div ref={containerRef}>
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title className="d-flex align-items-center">
            Simple Query Builder
          </Modal.Title>
        </Modal.Header>
      
      <Modal.Body className="p-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {/* Error Message */}
        {errorMessage && <Card className={`query-builder-card mb-2`}>
          <Card.Body className="p-3">
            <div className="d-flex align-items-center text-danger">
              <span className="fw-medium">{errorMessage}</span>
            </div>
          </Card.Body>
        </Card>}

        {/* Table Selection */}
        <TableSelectionCard
          selectedTable={selectedTable}
          selectedColumns={selectedColumns}
          joins={joins}
          tableColumns={tableColumns}
          onTableSelect={onTableSelect}
          onColumnsChange={onColumnsChange}
          onJoinAdd={addJoin}
          onJoinUpdate={updateJoin}
          onJoinRemove={removeJoin}
          onErrorClear={clearError}
        />

        {/* Conditions */}
        {selectedTable && (
          <ConditionsCard
            conditions={conditions}
            tableColumns={tableColumns}
            onAddCondition={addCondition}
            onUpdateCondition={updateCondition}
            onRemoveCondition={removeCondition}
          />
        )}

        {/* Sorting & Limits */}
        {selectedTable && (
          <SortingAndLimitsCard
            orderBy={orderBy}
            limit={limit}
            tableColumns={tableColumns}
            onOrderByChange={handleOrderByChange}
            onLimitChange={handleLimitChange}
          />
        )}

        {/* Query Preview */}
        <QueryPreviewCard generatedQuery={generatedQuery} />
      </Modal.Body>

      <Modal.Footer className="border-top">
        <div className="d-flex justify-content-between w-100">
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleGenerateQuery}
          >
            Generate & Run Query
          </Button>
        </div>
      </Modal.Footer>
      </div>
    </Modal>
  );
});

SimpleQueryBuilder.displayName = 'SimpleQueryBuilder';

export default SimpleQueryBuilder;