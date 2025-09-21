/**
 * Header Type Constants
 * Defines which columns should be treated as specific data types
 */

// Numeric columns
export const NUMBER_HEADERS = [
  'price',
  'stock',
  'product_stock',
  'quantity',
  'total_amount',
  'days_ago',
  'id',
  'user_id',
  'product_id',
  'order_id',
  'row_id'
];

// Date columns
export const DATE_HEADERS = [
  'created_at',
  'user_created',
  'order_date',
  'updated_at',
  'last_login',
  'birth_date',
  'expiry_date'
];

// Email columns
export const EMAIL_HEADERS = [
  'email',
  'contact_email',
  'user_email'
];

// Boolean columns
export const BOOLEAN_HEADERS = [
  'is_active',
  'is_verified',
  'is_premium',
  'is_deleted',
  'enabled',
  'active',
  'verified'
];

// Text columns (everything else is treated as text by default)
export const TEXT_HEADERS = [
  'username',
  'name',
  'product_name',
  'category',
  'description',
  'title',
  'first_name',
  'last_name',
  'address',
  'city',
  'country',
  'phone',
  'status',
  'order_type',
  'unique_identifier'
];

/**
 * Get the data type for a given column name
 * @param {string} columnName - The column name to check
 * @returns {string} - The detected data type ('text', 'number', 'date', 'boolean', 'email')
 */
export const getColumnType = (columnName) => {
  const lowerColumnName = columnName.toLowerCase();
  
  if (NUMBER_HEADERS.some(header => lowerColumnName.includes(header.toLowerCase()))) {
    return 'number';
  }
  
  if (DATE_HEADERS.some(header => lowerColumnName.includes(header.toLowerCase()))) {
    return 'date';
  }
  
  if (EMAIL_HEADERS.some(header => lowerColumnName.includes(header.toLowerCase()))) {
    return 'email';
  }
  
  if (BOOLEAN_HEADERS.some(header => lowerColumnName.includes(header.toLowerCase()))) {
    return 'boolean';
  }
  
  // Default to text
  return 'text';
};

/**
 * Get the appropriate input type for a column type
 * @param {string} columnType - The column type
 * @returns {string} - HTML input type
 */
export const getInputType = (columnType) => {
  switch (columnType) {
    case 'number':
      return 'number';
    case 'email':
      return 'email';
    case 'date':
      return 'date';
    case 'boolean':
      return 'checkbox';
    default:
      return 'text';
  }
};

/**
 * Get operator options for a column type
 * @param {string} columnType - The column type
 * @returns {Array} - Array of operator options
 */
export const getOperatorOptions = (columnType) => {
  switch (columnType) {
    case 'number':
      return [
        { value: '=', label: 'Equals' },
        { value: '!=', label: 'Not Equals' },
        { value: '>', label: 'Greater Than' },
        { value: '>=', label: 'Greater Than or Equal' },
        { value: '<', label: 'Less Than' },
        { value: '<=', label: 'Less Than or Equal' },
        { value: 'BETWEEN', label: 'Between' }
      ];
    case 'date':
      return [
        { value: '=', label: 'Equals' },
        { value: '!=', label: 'Not Equals' },
        { value: '>', label: 'After' },
        { value: '>=', label: 'On or After' },
        { value: '<', label: 'Before' },
        { value: '<=', label: 'On or Before' },
        { value: 'BETWEEN', label: 'Between' }
      ];
    case 'boolean':
      return [
        { value: '=', label: 'Is' },
        { value: '!=', label: 'Is Not' }
      ];
    case 'email':
    case 'text':
    default:
      return [
        { value: '=', label: 'Equals' },
        { value: '!=', label: 'Not Equals' },
        { value: 'LIKE', label: 'Contains' },
        { value: 'NOT LIKE', label: 'Does Not Contain' },
        { value: 'STARTS_WITH', label: 'Starts With' },
        { value: 'ENDS_WITH', label: 'Ends With' }
      ];
  }
};
