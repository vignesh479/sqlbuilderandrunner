import React, { useState, useMemo, useCallback } from 'react';
import { Modal, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { FaSearch, FaTimes, FaFilter } from 'react-icons/fa';
import { getColumnType, getInputType, getOperatorOptions } from '../constants/headerTypes';
import useFocusTrap from '../hooks/useFocusTrap';
import { useFilterValidation } from '../hooks/useFilterValidation';
import FilterInputField from './SearchModal/FilterInputField';

/**
 * Search Modal Component
 * Provides dynamic search/filter interface for table data
 */
const SearchModal = ({ show, onHide, data, onApplyFilters, onClearFilters }) => {
  const [filters, setFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState(0);

  // Focus trap for modal accessibility
  const { containerRef } = useFocusTrap(show);

  // Analyze data to get column types from constants
  const columnAnalysis = useMemo(() => {
    if (!data || data.length === 0 || !data[0]) return {};
    
    const analysis = {};
    const headers = Object.keys(data[0]);
    
    headers.forEach(header => {
      const columnType = getColumnType(header);
      const values = data.map(row => row[header]);
      analysis[header] = {
        type: columnType,
        inputType: getInputType(columnType),
        operators: getOperatorOptions(columnType),
        sampleValues: [...new Set(values.slice(0, 10))].filter(v => v !== null && v !== undefined)
      };
    });
    
    return analysis;
  }, [data]);

  // Filter validation hook
  const { errors, validateFilters, clearErrors } = useFilterValidation();

  // Handle filter changes
  const handleFilterChange = useCallback((column, field, value) => {
    setFilters(prev => ({
      ...prev,
      [column]: {
        ...prev[column],
        [field]: value
      }
    }));
  }, []);

  // Add a new filter
  const addFilter = useCallback((column) => {
    const columnInfo = columnAnalysis[column];
    setFilters(prev => ({
      ...prev,
      [column]: {
        operator: columnInfo.operators[0].value,
        value: '',
        value2: '', // For BETWEEN operator
        enabled: true
      }
    }));
    setActiveFilters(prev => prev + 1);
  }, [columnAnalysis]);

  // Remove a filter
  const removeFilter = useCallback((column) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[column];
      return newFilters;
    });
    setActiveFilters(prev => Math.max(0, prev - 1));
  }, []);

  // Toggle filter enabled state
  const toggleFilter = useCallback((column) => {
    setFilters(prev => ({
      ...prev,
      [column]: {
        ...prev[column],
        enabled: !prev[column].enabled
      }
    }));
  }, []);


  // Apply filters
  const handleApplyFilters = useCallback(() => {
    // Clear previous errors
    clearErrors();
    
    // Validate filters
    if (!validateFilters(filters)) {
      return; // Don't apply if validation fails
    }

    const enabledFilters = Object.entries(filters)
      .filter(([_, filter]) => filter.enabled && filter.value)
      .reduce((acc, [column, filter]) => {
        acc[column] = filter;
        return acc;
      }, {});
    
    onApplyFilters(enabledFilters);
    onHide();
  }, [filters, onApplyFilters, onHide, validateFilters, clearErrors]);

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setFilters({});
    setActiveFilters(0);
    clearErrors();
    onClearFilters();
  }, [onClearFilters, clearErrors]);


  // Get available columns (not already filtered)
  const availableColumns = useMemo(() => {
    const filteredColumns = Object.keys(filters);
    return Object.keys(columnAnalysis).filter(col => !filteredColumns.includes(col));
  }, [columnAnalysis, filters]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <div ref={containerRef} className="query-builder-card">
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title className="d-flex align-items-center">
            <FaSearch className="me-2" />
            Search & Filter Results
          </Modal.Title>
        </Modal.Header>
      
        <Modal.Body className="p-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {/* Add Filter Section */}
          {availableColumns.length > 0 && (
            <Card className="mb-4">
              <Card.Header className="py-2">
                <h6 className="mb-0">Add Filter</h6>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <Form.Select
                      value=""
                      onChange={(e) => {
                        if (e.target.value) {
                          addFilter(e.target.value);
                          e.target.value = '';
                        }
                      }}
                      size="sm"
                      aria-label="Select a column to add a filter"
                    >
                      <option value="">Select a column to filter...</option>
                      {availableColumns.map(column => (
                        <option key={column} value={column}>
                          {column} ({columnAnalysis[column].type})
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}

          {/* Active Filters */}
          {Object.keys(filters).length > 0 && (
            <Card>
              <Card.Header className="py-2">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">Active Filters</h6>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleClearFilters}
                  >
                    <FaTimes className="me-1" />
                    Clear All
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                {Object.entries(filters).map(([column, filter]) => {
                  const columnInfo = columnAnalysis[column];
                  const hasError = errors[column];
                  return (
                    <div key={column} className={`filter-row mb-3 p-3 border rounded ${hasError ? 'border-danger' : ''}`}>
                      <Row className="align-items-center">
                        <Col md={1}>
                          <Form.Check
                            type="checkbox"
                            checked={filter.enabled}
                            onChange={() => toggleFilter(column)}
                            title="Enable/Disable filter"
                            aria-label={`Enable or disable filter for ${column}`}
                          />
                        </Col>
                        <Col md={2}>
                          <div className="fw-medium">{column}</div>
                          <small className="text-muted">{columnInfo.type}</small>
                        </Col>
                        <Col md={3}>
                          <Form.Select
                            value={filter.operator || ''}
                            onChange={(e) => handleFilterChange(column, 'operator', e.target.value)}
                            size="sm"
                            isInvalid={hasError}
                            aria-label={`Select filter operator for ${column}`}
                          >
                            {columnInfo.operators.map(op => (
                              <option key={op.value} value={op.value}>
                                {op.label}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col md={5}>
                          <FilterInputField
                            column={column}
                            filter={filter}
                            columnInfo={columnInfo}
                            hasError={hasError}
                            onFilterChange={handleFilterChange}
                          />
                          {hasError && (
                            <div className="text-danger small mt-1">
                              {hasError}
                            </div>
                          )}
                        </Col>
                        <Col md={1}>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => removeFilter(column)}
                            title="Remove filter"
                          >
                            <FaTimes />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          )}
        </Modal.Body>

        <Modal.Footer className="border-top">
          <div className="d-flex justify-content-between w-100">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <div>
              <Button
                variant="outline-danger"
                onClick={handleClearFilters}
                className="me-2"
                disabled={activeFilters === 0}
              >
                Clear All
              </Button>
              <Button
                variant="primary"
                onClick={handleApplyFilters}
              >
                <FaFilter className="me-1" />
                Apply Filters
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default SearchModal;
