import React from 'react';
import { Button } from 'react-bootstrap';

/**
 * Collapsed Query View Component
 * Shows query preview and execute button when collapsed
 */
const CollapsedQueryView = React.memo(({ 
  formattedQuery, 
  onToggleExpanded, 
  onExecuteQuery,
  isLoading,
  hasError,
  canExecute
}) => {
  return (
    <div className="collapsed-query-display mb-3" onClick={onToggleExpanded}>
      <div className="query-preview-text d-flex justify-content-between align-items-center">
        {formattedQuery}
        <Button 
          variant="primary" 
          size="sm"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering expand
            onExecuteQuery();
          }}
          disabled={isLoading || !canExecute || hasError}
        >
          {isLoading ? 'Running...' : 'Execute Query'}
        </Button>
      </div>
    </div>
  );
});

CollapsedQueryView.displayName = 'CollapsedQueryView';

export default CollapsedQueryView;
