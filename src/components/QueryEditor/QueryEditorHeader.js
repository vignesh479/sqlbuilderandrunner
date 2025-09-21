import React from 'react';
import { Button } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import QueryHistoryDropdown from './QueryHistoryDropdown';

/**
 * Query Editor Header Component
 * Contains history dropdown and expand/collapse toggle
 */
const QueryEditorHeader = React.memo(({ 
  isExpanded, 
  onToggleExpanded, 
  onHistorySelect 
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-2">
      <QueryHistoryDropdown 
        onHistorySelect={onHistorySelect}
        isVisible={isExpanded}
      />
      
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={onToggleExpanded}
        className="collapse-toggle-btn"
      >
        {isExpanded ? (
          <FaChevronDown />
        ) : (
          <>
            <span>Expand</span>
            <FaChevronUp className="ms-2" />
          </>
        )}
      </Button>
    </div>
  );
});

QueryEditorHeader.displayName = 'QueryEditorHeader';

export default QueryEditorHeader;
