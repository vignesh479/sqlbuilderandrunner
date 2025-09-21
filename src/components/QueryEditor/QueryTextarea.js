import React from 'react';
import { Form, Alert } from 'react-bootstrap';

/**
 * Query Textarea Component
 * Handles the main SQL input area with validation
 */
const QueryTextarea = React.memo(({ 
  query,
  error,
  isLoading,
  onChange,
  onKeyDown
}) => {
  return (
    <>
      {error && (
        <Alert variant="warning" className="py-2 mb-2">
          <small>{error}</small>
        </Alert>
      )}
      
      <div>
        <Form.Control
          id="query-textarea"
          as="textarea"
          className="query-textarea"
          rows={8}
          value={query}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Enter your SQL query here..."
          disabled={isLoading}
          autoFocus={true}
          aria-label="SQL query editor textarea"
        />
      </div>
    </>
  );
});

QueryTextarea.displayName = 'QueryTextarea';

export default QueryTextarea;
