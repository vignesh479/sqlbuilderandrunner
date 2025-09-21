import React from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { getOperatorsForType } from '../../constants';

/**
 * Conditions Card Component
 * Handles filter conditions (WHERE clauses)
 */
const ConditionsCard = ({
  conditions,
  tableColumns,
  onAddCondition,
  onUpdateCondition,
  onRemoveCondition
}) => {
  return (
    <Card className="mb-4 query-builder-card">
      <Card.Header className="py-2">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">🔍 Step 2: Add Filters (Optional)</h6>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={onAddCondition}
          >
            + Add Condition
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        {conditions.length === 0 ? (
          <div className="text-center">No filters added yet</div>
        ) : (
          <div className="conditions-list">
            {conditions.map((condition, index) => (
              <div key={condition.id} className="condition-row mb-3 p-3 border rounded">
                <Row className="align-items-center">
                  {index > 0 && (
                    <Col md={2}>
                      <Form.Select
                        value={condition.logicalOperator}
                        onChange={(e) => onUpdateCondition(condition.id, 'logicalOperator', e.target.value)}
                        size="sm"
                        aria-label="Select logical operator to combine with previous condition"
                      >
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                      </Form.Select>
                    </Col>
                  )}
                  <Col md={index > 0 ? 3 : 4}>
                    <Form.Select
                      value={condition.column}
                      onChange={(e) => onUpdateCondition(condition.id, 'column', e.target.value)}
                      size="sm"
                      aria-label="Select column to filter on"
                    >
                      <option value="">Select column...</option>
                      {tableColumns.map(col => (
                        <option key={col.name} value={col.name}>
                          {col.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={3}>
                    <Form.Select
                      value={condition.operator}
                      onChange={(e) => onUpdateCondition(condition.id, 'operator', e.target.value)}
                      size="sm"
                      disabled={!condition.column}
                      aria-label="Select filter operator"
                    >
                      {condition.column && (() => {
                        const column = tableColumns.find(col => col.name === condition.column);
                        return getOperatorsForType(column?.type || 'text').map(op => (
                          <option key={op.value} value={op.value}>
                            {op.label}
                          </option>
                        ));
                      })()}
                    </Form.Select>
                  </Col>
                  <Col md={3}>
                    <Form.Control
                      type="text"
                      placeholder="Value..."
                      value={condition.value}
                      onChange={(e) => onUpdateCondition(condition.id, 'value', e.target.value)}
                      size="sm"
                      aria-label="Enter filter value"
                    />
                  </Col>
                  <Col md={1}>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => onRemoveCondition(condition.id)}
                    >
                      ×
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ConditionsCard;
