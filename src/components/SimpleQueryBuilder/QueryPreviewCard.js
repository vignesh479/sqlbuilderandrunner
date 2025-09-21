import React from 'react';
import { Card } from 'react-bootstrap';

/**
 * Query Preview Card Component
 * Displays the generated SQL query
 */
const QueryPreviewCard = ({ generatedQuery }) => {
  if (!generatedQuery) return null;

  return (
    <Card className="query-builder-card">
      <Card.Header className="py-2">
        <h6 className="mb-0">Generated Query Preview</h6>
      </Card.Header>
      <Card.Body>
        <pre className="query-preview-code p-3 rounded mb-0">
          <code>{generatedQuery}</code>
        </pre>
      </Card.Body>
    </Card>
  );
};

export default QueryPreviewCard;
