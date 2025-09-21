/**
 * Constants Index
 * Centralized export for all constants
 */

export { CUSTOM_QUERIES } from './customQueries';
export { AVAILABLE_TABLES } from './availableTables';
export { 
  TEXT_OPERATORS, 
  NUMBER_OPERATORS, 
  DATE_OPERATORS, 
  BOOLEAN_OPERATORS, 
  getOperatorsForType 
} from './operators';
export {
  MOCK_USERS_DATA,
  MOCK_GENERIC_DATA,
  LARGE_DATASET_CONFIG,
  EXECUTION_TIME_RANGES,
  generateLargeDataset
} from './mockData';
export {
  NUMBER_HEADERS,
  DATE_HEADERS,
  EMAIL_HEADERS,
  BOOLEAN_HEADERS,
  TEXT_HEADERS,
  getColumnType,
  getInputType,
  getOperatorOptions
} from './headerTypes';
export { QUERY_HISTORY } from './queryHistory';

// Re-export defaults for convenience
export { default as CUSTOM_QUERIES_DEFAULT } from './customQueries';
export { default as AVAILABLE_TABLES_DEFAULT } from './availableTables';
export { default as OPERATORS_DEFAULT } from './operators';
