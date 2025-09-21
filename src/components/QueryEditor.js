import React, { forwardRef, useImperativeHandle } from 'react';
import { Form, Collapse } from 'react-bootstrap';
import SimpleQueryBuilder from './SimpleQueryBuilder/SimpleQueryBuilder';
import { useQueryLoading } from '../contexts/QueryExecutorContext';
import { useQueryEditor } from '../hooks/useQueryEditor';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { Button } from 'react-bootstrap';

import QueryEditorHeader from './QueryEditor/QueryEditorHeader';
import CollapsedQueryView from './QueryEditor/CollapsedQueryView';
import QueryTextarea from './QueryEditor/QueryTextarea';
import QueryActionButtons from './QueryEditor/QueryActionButtons';

const QueryEditor = React.memo(forwardRef((props, ref) => {
  const { isLoading } = useQueryLoading();
  
  // Business logic hooks
  const {
    query,
    error,
    isExpanded,
    showQueryBuilder,
    formattedQuery,
    handleQueryChange,
    handleQueryExecute,
    toggleExpanded,
    openQueryBuilder,
    closeQueryBuilder,
    handleQueryGenerated,
    selectFromHistory,
    imperativeHandlers
  } = useQueryEditor();

  // Keyboard shortcuts hook
  const { handleKeyPress } = useKeyboardShortcuts(
    openQueryBuilder,
    handleQueryExecute
  );

  // Expose imperative API
  useImperativeHandle(ref, () => imperativeHandlers, [imperativeHandlers]);

  // Computed values
  const canExecute = query.trim();
  const hasError = Boolean(error);

  return (
    <div className="query-editor p-3 mb-3">
      <Form.Group>
        {/* Header with history and toggle */}
        <QueryEditorHeader 
          isExpanded={isExpanded}
          onToggleExpanded={toggleExpanded}
          onHistorySelect={selectFromHistory}
        />

        {/* Collapsed View */}
        {!isExpanded && (
          <CollapsedQueryView 
            formattedQuery={formattedQuery}
            onToggleExpanded={toggleExpanded}
            onExecuteQuery={handleQueryExecute}
            isLoading={isLoading}
            hasError={hasError}
            canExecute={canExecute}
          />
        )}
        
        {/* Expanded View */}
        <Collapse in={isExpanded}>
          <div className="position-relative">
            <QueryTextarea 
              query={query}
              error={error}
              isLoading={isLoading}
              onChange={handleQueryChange}
              onKeyDown={handleKeyPress}
            />
            <QueryActionButtons 
              isLoading={isLoading}
              hasError={hasError}
              canExecute={canExecute}
              onOpenQueryBuilder={openQueryBuilder}
              onExecuteQuery={handleQueryExecute}
            />
          </div>
        </Collapse>
        {/* Mobile Buttons */}
        <div className="mt-2">
          <div className="query-buttons-mobile">
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={openQueryBuilder}
              disabled={isLoading}
            >
              Simple Query Builder
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={handleQueryExecute}
              disabled={isLoading || !canExecute || hasError}
            >
              {isLoading ? 'Running...' : 'Execute Query'}
            </Button>
          </div>
        </div>
      </Form.Group>

      {/* Query Builder Modal */}
      <SimpleQueryBuilder
        show={showQueryBuilder}
        onHide={closeQueryBuilder}
        onQueryGenerated={handleQueryGenerated}
      />
    </div>
  );
}));

QueryEditor.displayName = 'QueryEditor';

export default QueryEditor;
