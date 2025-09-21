import React, { useMemo, useCallback } from 'react';
import { Card, Form, Button, Row, Col, Badge } from 'react-bootstrap';
import Select from 'react-select';
import CustomSelectOption from './CustomSelectOption';
import { AVAILABLE_TABLES } from '../../constants';

/**
 * Table Selection Card Component
 * Handles table selection, column selection, and join management
 */
const TableSelectionCard = ({
  selectedTable,
  selectedColumns,
  joins,
  tableColumns,
  onTableSelect,
  onColumnsChange,
  onJoinAdd,
  onJoinUpdate,
  onJoinRemove,
  onErrorClear
}) => {
  // Prepare options for react-select
  const columnOptions = useMemo(() => {
    return tableColumns.map(column => ({
      value: column.name,
      label: column.name,
      type: column.type,
      description: column.description
    }));
  }, [tableColumns]);

  // Get column options for a specific table (for joins)
  const getTableColumnOptions = useCallback((tableName) => {
    const table = AVAILABLE_TABLES.find(t => t.name === tableName);
    if (!table) return [];
    
    return table.columns.map(column => ({
      value: column.name,
      label: column.name,
      type: column.type,
      description: column.description
    }));
  }, []);

  return (
    <Card className="mb-4 query-builder-card">
      <Card.Header className="py-2">
        <h6 className="mb-0">Step 1: Choose Table & Columns</h6>
      </Card.Header>
      <Card.Body>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-medium">Choose Table</Form.Label>
              <Form.Select
                value={selectedTable}
                onChange={(e) => {
                  onTableSelect(e.target.value);
                  onErrorClear();
                }}
                className="query-builder-select"
                aria-label="Choose a table for your query"
              >
                <option value="">Select a table...</option>
                {AVAILABLE_TABLES.map(table => (
                  <option key={table.name} value={table.name}>
                    {table.name} ({table.columns.length} columns)
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            {selectedTable && (
              <div className="table-info">
                <h6 className="text-muted">Table: {selectedTable}</h6>
                <Badge bg="info">{tableColumns.length} columns available</Badge>
              </div>
            )}
          </Col>
        </Row>

        {selectedTable && (
          <Form.Group>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Form.Label className="fw-medium">Select Columns</Form.Label>
              <div>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => onColumnsChange(tableColumns.map(col => col.name))}
                  className="me-2"
                >
                  Select All
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => onColumnsChange([])}
                >
                  Clear All
                </Button>
              </div>
            </div>
            
            <Select
              isMulti
              options={columnOptions}
              value={columnOptions.filter(option => selectedColumns.includes(option.value))}
              onChange={(selectedOptions) => {
                onColumnsChange(selectedOptions ? selectedOptions.map(option => option.value) : []);
                onErrorClear();
              }}
              components={{
                Option: CustomSelectOption
              }}
              placeholder="Search and select columns..."
              isSearchable
              isClearable
              closeMenuOnSelect={true}
              hideSelectedOptions={true}
              className="mb-3"
              classNamePrefix="react-select"
              aria-label="Search and select columns from the chosen table"
            />
            
            {selectedColumns.length > 0 && (
              <div className="mt-2">
                <small className="text-muted">
                  {selectedColumns.length} column{selectedColumns.length !== 1 ? 's' : ''} selected
                </small>
              </div>
            )}
          </Form.Group>
        )}
        
        {/* Join Tables Option */}
        {selectedTable && (
          <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-medium mb-0">🔗 Include Related Records</h6>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={onJoinAdd}
                disabled={joins.length >= 3}
              >
                + Add Related Table {joins.length > 0 && `(${joins.length}/3)`}
              </Button>
            </div>
            
            {joins.length > 0 && (
              <div className="joins-list">
                {joins.map((join, index) => (
                  <div key={join.id} className="join-row mb-3 p-3 border rounded">
                    <Row className="align-items-center mb-3">
                      <Col md={5}>
                        <Form.Group>
                          <Form.Label className="small mb-1">Related Table</Form.Label>
                          <Form.Select
                            value={join.table}
                            onChange={(e) => onJoinUpdate(join.id, 'table', e.target.value)}
                            size="sm"
                            aria-label="Select a related table to join"
                          >
                            <option value="">Select related table...</option>
                            {AVAILABLE_TABLES
                              .filter(table => table.name !== selectedTable)
                              .map(table => (
                                <option key={table.name} value={table.name}>
                                  {table.name}
                                </option>
                              ))
                            }
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="small mb-1">Join Type</Form.Label>
                          <Form.Select
                            value={join.joinType}
                            onChange={(e) => onJoinUpdate(join.id, 'joinType', e.target.value)}
                            size="sm"
                            aria-label="Select the type of join to perform"
                          >
                            <option value="LEFT JOIN">LEFT JOIN (Include all rows from main table)</option>
                            <option value="INNER JOIN">INNER JOIN (Only matching rows)</option>
                            <option value="RIGHT JOIN">RIGHT JOIN (Include all rows from related table)</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={1} className="d-flex justify-content-end">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => onJoinRemove(join.id)}
                        >
                          ×
                        </Button>
                      </Col>
                    </Row>
                    
                    {join.table && (
                      <>
                        <Row className="mb-3">
                          <Col md={12}>
                            <Form.Label className="small mb-1">Define Relationship</Form.Label>
                            <div className="d-flex align-items-center">
                              <Form.Select
                                value={join.leftColumn}
                                onChange={(e) => onJoinUpdate(join.id, 'leftColumn', e.target.value)}
                                size="sm"
                                className="me-2"
                                aria-label={`Select column from ${selectedTable} table for join relationship`}
                              >
                                <option value="">Select column from {selectedTable}...</option>
                                {tableColumns.map(col => (
                                  <option key={col.name} value={col.name}>
                                    {col.name} ({col.type})
                                  </option>
                                ))}
                              </Form.Select>
                              <div className="mx-2">= </div>
                              <Form.Select
                                value={join.rightColumn}
                                onChange={(e) => onJoinUpdate(join.id, 'rightColumn', e.target.value)}
                                size="sm"
                                aria-label={`Select column from ${join.table} table for join relationship`}
                              >
                                <option value="">Select column from {join.table}...</option>
                                {AVAILABLE_TABLES
                                  .find(table => table.name === join.table)
                                  ?.columns.map(col => (
                                    <option key={col.name} value={col.name}>
                                      {col.name} ({col.type})
                                    </option>
                                  ))
                                }
                              </Form.Select>
                            </div>
                          </Col>
                        </Row>
                        
                        <Row>
                          <Col md={12}>
                            <Form.Label className="small mb-1">Select Columns from {join.table}</Form.Label>
                            <Select
                              isMulti
                              options={getTableColumnOptions(join.table)}
                              value={getTableColumnOptions(join.table).filter(option => join.columns.includes(option.value))}
                              onChange={(selectedOptions) => {
                                const selectedColumns = selectedOptions ? selectedOptions.map(option => option.value) : [];
                                onJoinUpdate(join.id, 'columns', selectedColumns);
                              }}
                              components={{
                                Option: CustomSelectOption
                              }}
                              placeholder={`Search and select columns from ${join.table}...`}
                              isSearchable
                              isClearable
                              closeMenuOnSelect={true}
                              hideSelectedOptions={true}
                              className="mb-2"
                              classNamePrefix="react-select"
                              aria-label={`Search and select columns from ${join.table} table`}
                            />
                            {join.columns.length > 0 && (
                              <div className="mt-1">
                                <small className="text-muted">
                                  {join.columns.length} column{join.columns.length !== 1 ? 's' : ''} selected
                                </small>
                              </div>
                            )}
                          </Col>
                        </Row>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default TableSelectionCard;
