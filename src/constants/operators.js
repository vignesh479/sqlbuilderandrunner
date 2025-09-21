/**
 * SQL Operators Constants
 * Operators for different column types in query conditions
 */

export const TEXT_OPERATORS = [
  { value: '=', label: 'equals' },
  { value: 'LIKE', label: 'contains' },
  { value: 'NOT LIKE', label: 'does not contain' },
  { value: 'IN', label: 'is one of' }
];

export const NUMBER_OPERATORS = [
  { value: '=', label: 'equals' },
  { value: '>', label: 'greater than' },
  { value: '<', label: 'less than' },
  { value: '>=', label: 'greater than or equal' },
  { value: '<=', label: 'less than or equal' },
  { value: 'BETWEEN', label: 'between' }
];

export const DATE_OPERATORS = [
  { value: '=', label: 'on date' },
  { value: '>', label: 'after date' },
  { value: '<', label: 'before date' },
  { value: '>=', label: 'on or after' },
  { value: '<=', label: 'on or before' }
];

export const BOOLEAN_OPERATORS = [
  { value: '=', label: 'is' }
];

/**
 * Get operators for a specific column type
 * @param {string} type - Column type (text, number, date, boolean)
 * @returns {Array} Array of operator objects
 */
export const getOperatorsForType = (type) => {
  switch (type) {
    case 'text':
      return TEXT_OPERATORS;
    case 'number':
      return NUMBER_OPERATORS;
    case 'date':
      return DATE_OPERATORS;
    case 'boolean':
      return BOOLEAN_OPERATORS;
    default:
      return TEXT_OPERATORS; // Default to text operators
  }
};

const operators = {
  TEXT_OPERATORS,
  NUMBER_OPERATORS,
  DATE_OPERATORS,
  BOOLEAN_OPERATORS,
  getOperatorsForType
};

export default operators;
