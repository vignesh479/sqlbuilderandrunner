/**
 * Custom Queries Constants
 * Predefined SQL queries for quick access
 */

export const CUSTOM_QUERIES = [
  {
    name: 'Recent Orders',
    query: `SELECT o.id, u.username, p.name as product_name, o.quantity, o.order_date
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN products p ON o.product_id = p.id
WHERE o.order_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)
ORDER BY o.order_date DESC;`
  },
  {
    name: 'Top Products',
    query: `SELECT p.name, p.price, p.category, SUM(o.quantity) as total_sold
FROM products p
LEFT JOIN orders o ON p.id = o.product_id
GROUP BY p.id
ORDER BY total_sold DESC
LIMIT 10;`
  },
  {
    name: 'Large data',
    query: 'SELECT * from data_table;'
  }
];

export default CUSTOM_QUERIES;
