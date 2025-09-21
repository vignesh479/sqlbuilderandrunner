/**
 * Available Tables Constants
 * Mock table data - in real app this would come from database schema
 */

export const AVAILABLE_TABLES = [
  {
    name: 'users',
    columns: [
      { name: 'id', type: 'number', description: 'User ID' },
      { name: 'username', type: 'text', description: 'Username' },
      { name: 'email', type: 'text', description: 'Email address' },
      { name: 'created_at', type: 'date', description: 'Registration date' },
      { name: 'last_login', type: 'date', description: 'Last login time' },
      { name: 'is_active', type: 'boolean', description: 'Account status' }
    ]
  },
  {
    name: 'orders',
    columns: [
      { name: 'id', type: 'number', description: 'Order ID' },
      { name: 'user_id', type: 'number', description: 'Customer ID' },
      { name: 'product_id', type: 'number', description: 'Product ID' },
      { name: 'quantity', type: 'number', description: 'Quantity ordered' },
      { name: 'total_amount', type: 'number', description: 'Total order amount' },
      { name: 'order_date', type: 'date', description: 'Order placement date' },
      { name: 'status', type: 'text', description: 'Order status' }
    ]
  },
  {
    name: 'products',
    columns: [
      { name: 'id', type: 'number', description: 'Product ID' },
      { name: 'name', type: 'text', description: 'Product name' },
      { name: 'price', type: 'number', description: 'Product price' },
      { name: 'category', type: 'text', description: 'Product category' },
      { name: 'stock', type: 'number', description: 'Available stock' },
      { name: 'created_at', type: 'date', description: 'Product creation date' }
    ]
  },
  {
    name: 'categories',
    columns: [
      { name: 'id', type: 'number', description: 'Category ID' },
      { name: 'name', type: 'text', description: 'Category name' },
      { name: 'description', type: 'text', description: 'Category description' }
    ]
  }
];

export default AVAILABLE_TABLES;
