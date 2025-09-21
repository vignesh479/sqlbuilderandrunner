/**
 * Query History Constants
 * Predefined queries for history dropdown and quick access
 */

export const QUERY_HISTORY = [
  'SELECT * FROM users WHERE created_at > \'2023-01-01\';',
  'SELECT u.username, COUNT(o.id) as order_count FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.id;',
  'SELECT p.name, p.price, c.name as category FROM products p JOIN categories c ON p.category_id = c.id WHERE p.price > 100;',
  'UPDATE users SET last_login = NOW() WHERE id = 1;',
  'SELECT AVG(price) as avg_price, category FROM products GROUP BY category ORDER BY avg_price DESC;'
];

export default QUERY_HISTORY;
