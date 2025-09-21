import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { FaChartBar } from 'react-icons/fa';

/**
 * Sorting and Limits Card Component
 * Handles ORDER BY and LIMIT clauses
 */
const SortingAndLimitsCard = ({
  orderBy,
  limit,
  tableColumns,
  onOrderByChange,
  onLimitChange
}) => {
  return (
    <Card className="mb-4 query-builder-card">
      <Card.Header className="py-2">
        <h6 className="mb-0"><FaChartBar className="me-2" />Step 3: Sort & Limit (Optional)</h6>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Sort By</Form.Label>
              <Row>
                <Col md={8}>
                  <Form.Select
                    value={orderBy.column}
                    onChange={(e) => onOrderByChange('column', e.target.value)}
                    aria-label="Select column to sort by"
                  >
                    <option value="">No sorting</option>
                    {tableColumns.map(col => (
                      <option key={col.name} value={col.name}>
                        {col.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={4}>
                  <Form.Select
                    value={orderBy.direction}
                    onChange={(e) => onOrderByChange('direction', e.target.value)}
                    disabled={!orderBy.column}
                    aria-label="Select sort direction"
                  >
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Limit Results</Form.Label>
              <Form.Select
                value={limit}
                onChange={(e) => onLimitChange(parseInt(e.target.value))}
                aria-label="Select number of rows to limit results"
              >
                <option value={10}>10 rows</option>
                <option value={50}>50 rows</option>
                <option value={100}>100 rows</option>
                <option value={500}>500 rows</option>
                <option value={1000}>1000 rows</option>
                <option value={0}>No limit</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SortingAndLimitsCard;
