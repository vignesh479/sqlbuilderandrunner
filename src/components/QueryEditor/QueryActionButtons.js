import React from 'react';
import { Button } from 'react-bootstrap';

/**
 * Query Action Buttons Component
 * Contains query builder and execute buttons for desktop and mobile
 */
const QueryActionButtons = React.memo(({ 
  isLoading,
  hasError,
  canExecute,
  onOpenQueryBuilder,
  onExecuteQuery
}) => {
  const isDisabled = isLoading || !canExecute || hasError;
  
  return (
    <>
      {/* Desktop Buttons */}
      <div className="query-buttons">
        <Button 
          variant="outline-primary" 
          size="sm"
          onClick={onOpenQueryBuilder}
          disabled={isLoading}
        >
          Simple Query Builder <small className="text-muted">(ctrl+/)</small>
        </Button>
        <Button 
          variant="primary" 
          size="sm"
          onClick={onExecuteQuery}
          disabled={isDisabled}
        >
          {isLoading ? 'Running...' : (
            <div>Execute Query <small className="text-muted">(ctrl+enter)</small></div>
          )}
        </Button>
      </div>
    </>
  );
});

QueryActionButtons.displayName = 'QueryActionButtons';

export default QueryActionButtons;
