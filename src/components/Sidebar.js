import React, { useState, useCallback } from 'react';
import { Col, Accordion, ListGroup } from 'react-bootstrap';
import { CUSTOM_QUERIES } from '../constants';
import AddQueryModal from './AddQueryModal';

/**
 * Memoized Query Item Component
 * Prevents unnecessary re-renders of individual query items
 */
const QueryItem = React.memo(({ queryItem, index, onClick }) => (
  <ListGroup.Item 
    key={index}
    action
    className="border-0 py-2"
    style={{ cursor: 'pointer' }}
    onClick={onClick}
  >
    <span className="text-dark">{queryItem.name}</span>
  </ListGroup.Item>
));

QueryItem.displayName = 'QueryItem';

/**
 * Sidebar Component
 * Contains navigation and query templates with Bootstrap grid layout
 */
const Sidebar = React.memo(({ onQuerySelect }) => {
  const [customQueries, setCustomQueries] = useState(CUSTOM_QUERIES);
  const [showModal, setShowModal] = useState(false);

  const handleSaveQuery = useCallback((newQuery) => {
    setCustomQueries(prev => [...prev, newQuery]);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleShowModal = useCallback(() => {
    setShowModal(true);
  }, []);

  return (
    <Col xs={12} md={3} lg={2} className="sidebar">
      <div className="sidebar p-3">
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <strong>Custom Queries</strong>
          </Accordion.Header>
          <Accordion.Body className="p-0">
            <ListGroup variant="flush">
              {customQueries.map((queryItem, index) => (
                <QueryItem
                  key={index}
                  queryItem={queryItem}
                  index={index}
                  onClick={() => onQuerySelect && onQuerySelect(queryItem.query)}
                />
              ))}
              <ListGroup.Item 
                action
                className="border-0 py-2 text-primary"
                style={{ cursor: 'pointer' }}
                onClick={handleShowModal}
              >
                <small>+ Add New Query</small>
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      </div>
      
      <AddQueryModal
        show={showModal}
        onHide={handleCloseModal}
        onSave={handleSaveQuery}
      />
    </Col>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
