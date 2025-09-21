import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaHistory } from 'react-icons/fa';
import { QUERY_HISTORY } from '../../constants';

/**
 * Memoized Query History Dropdown Component
 * Displays recent queries for quick selection
 */
const QueryHistoryDropdown = React.memo(({ onHistorySelect, isVisible = true }) => {
  if (!isVisible) return <div></div>;

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="outline-secondary"
        size="sm"
        className="history-dropdown-btn"
        id="query-history-dropdown"
      >
        <FaHistory />
      </Dropdown.Toggle>

      <Dropdown.Menu className="query-history-menu">
        <Dropdown.Header>Recent Queries</Dropdown.Header>
        {QUERY_HISTORY.map((historyQuery, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => onHistorySelect(historyQuery)}
            className="query-history-item"
          >
            <div className="history-query-preview">
              {historyQuery.length > 60 
                ? `${historyQuery.substring(0, 60)}...` 
                : historyQuery
              }
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
});

QueryHistoryDropdown.displayName = 'QueryHistoryDropdown';

export default QueryHistoryDropdown;
