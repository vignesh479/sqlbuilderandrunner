import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

/**
 * FilterInputField Component
 * Renders appropriate input field based on column type and filter operator
 */
const FilterInputField = React.memo(({ 
  column, 
  filter, 
  columnInfo, 
  hasError, 
  onFilterChange 
}) => {
  const { inputType, type } = columnInfo;
  
  // Boolean type dropdown
  if (type === 'boolean') {
    return (
      <Form.Select
        value={filter.value || ''}
        onChange={(e) => onFilterChange(column, 'value', e.target.value)}
        size="sm"
        isInvalid={hasError}
        aria-label={`Select boolean value for ${column} filter`}
      >
        <option value="">Select...</option>
        <option value="true">True</option>
        <option value="false">False</option>
      </Form.Select>
    );
  }
  
  // BETWEEN operator - dual input fields
  if (filter.operator === 'BETWEEN') {
    return (
      <Row className="g-2">
        <Col>
          <Form.Control
            type={inputType}
            placeholder="From"
            value={filter.value || ''}
            onChange={(e) => onFilterChange(column, 'value', e.target.value)}
            size="sm"
            isInvalid={hasError}
            aria-label={`Enter minimum value for ${column} range filter`}
          />
        </Col>
        <Col>
          <Form.Control
            type={inputType}
            placeholder="To"
            value={filter.value2 || ''}
            onChange={(e) => onFilterChange(column, 'value2', e.target.value)}
            size="sm"
            isInvalid={hasError}
            aria-label={`Enter maximum value for ${column} range filter`}
          />
        </Col>
      </Row>
    );
  }
  
  // Default input field
  return (
    <Form.Control
      type={inputType}
      placeholder={`Enter ${type} value...`}
      value={filter.value || ''}
      onChange={(e) => onFilterChange(column, 'value', e.target.value)}
      size="sm"
      isInvalid={hasError}
      aria-label={`Enter ${type} value for ${column} filter`}
    />
  );
});

FilterInputField.displayName = 'FilterInputField';

export default FilterInputField;
