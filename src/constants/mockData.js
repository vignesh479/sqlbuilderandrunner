/**
 * Mock Data Constants
 * Sample data for testing SQL queries
 */

export const MOCK_USERS_DATA = [
  { id: 1, username: 'john_doe', email: 'john@example.com', created_at: '2023-01-15' },
  { id: 2, username: 'jane_smith', email: 'jane@example.com', created_at: '2023-02-20' },
  { id: 3, username: 'bob_wilson', email: 'bob@example.com', created_at: '2023-03-10' },
  { id: 4, username: 'alice_brown', email: 'alice@example.com', created_at: '2023-04-05' },
  { id: 5, username: 'charlie_davis', email: 'charlie@example.com', created_at: '2023-05-12' }
];

export const MOCK_GENERIC_DATA = [
  { column1: 'Sample Data 1', column2: 'Value A', column3: 123 },
  { column1: 'Sample Data 2', column2: 'Value B', column3: 456 },
  { column1: 'Sample Data 3', column2: 'Value C', column3: 789 }
];

// Large dataset generation constants
export const LARGE_DATASET_CONFIG = {
  ROW_COUNT: 10000,
  USERNAMES: ['john_doe', 'jane_smith', 'bob_wilson', 'alice_brown', 'charlie_davis', 'emma_white', 'david_clark', 'lisa_martin', 'mike_taylor', 'sarah_jones'],
  PRODUCTS: ['Laptop Pro', 'Wireless Mouse', 'Desk Chair', 'Monitor 4K', 'Keyboard RGB', 'Webcam HD', 'Headphones', 'Tablet Pro', 'Phone Case', 'USB Cable'],
  CATEGORIES: ['Electronics', 'Furniture', 'Accessories', 'Computers', 'Mobile']
};

// Execution time ranges for different query types
export const EXECUTION_TIME_RANGES = {
  USERS: { min: 100, max: 600 },
  ORDERS: { min: 150, max: 450 },
  PRODUCTS: { min: 200, max: 600 },
  LARGE_DATASET: { min: 400, max: 1200 },
  GENERIC: { min: 100, max: 300 }
};

// Function to generate large dataset
export const generateLargeDataset = () => {
  const largeData = [];
  const { ROW_COUNT, USERNAMES, PRODUCTS, CATEGORIES } = LARGE_DATASET_CONFIG;
  
  for (let i = 1; i <= ROW_COUNT; i++) {
    const username = USERNAMES[i % USERNAMES.length];
    const product = PRODUCTS[i % PRODUCTS.length];
    const category = CATEGORIES[i % CATEGORIES.length];
    const price = Math.floor(Math.random() * 1000) + 50;
    const quantity = Math.floor(Math.random() * 5) + 1;
    
    largeData.push({
      row_id: i,
      order_id: 1000 + i,
      username: `${username}_${i}`,
      email: `${username}${i}@example.com`,
      user_created: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      product_name: `${product} ${i}`,
      price: price,
      category: category,
      product_stock: Math.floor(Math.random() * 50) + 10,
      quantity: quantity,
      order_date: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      total_amount: price * quantity,
      order_type: quantity > 2 ? 'High' : 'Normal',
      days_ago: Math.floor(Math.random() * 365),
      unique_identifier: `${username}_${i}_${1000 + i}`
    });
  }
  
  return largeData;
};

const mockData = {
  MOCK_USERS_DATA,
  MOCK_GENERIC_DATA,
  LARGE_DATASET_CONFIG,
  EXECUTION_TIME_RANGES
};

export default mockData;
