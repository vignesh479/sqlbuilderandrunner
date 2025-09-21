import React, { useState, useCallback } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

/**
 * Simple Add Query Modal
 * Modal for adding new custom queries with basic validation
 */
const AddQueryModal = React.memo(({ show, onHide, onSave }) => {
  const [queryName, setQueryName] = useState('');
  const [queryText, setQueryText] = useState('');
  const [error, setError] = useState('');

  const handleSave = useCallback(() => {
    // Simple empty validations
    if (!queryName.trim()) {
      setError('Query name is required');
      return;
    }
    
    if (!queryText.trim()) {
      setError('Query text is required');
      return;
    }

    // Create query object
    const newQuery = {
      name: queryName.trim(),
      query: queryText.trim()
    };

    // Call onSave callback
    onSave(newQuery);

    // Reset form and close modal
    setQueryName('');
    setQueryText('');
    setError('');
    onHide();
  }, [queryName, queryText, onSave, onHide]);

  const handleClose = useCallback(() => {
    setQueryName('');
    setQueryText('');
    setError('');
    onHide();
  }, [onHide]);

  const handleNameChange = useCallback((e) => {
    setQueryName(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  }, [error]);

  const handleTextChange = useCallback((e) => {
    setQueryText(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  }, [error]);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Query</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}
        
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Query Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter query name"
              value={queryName}
              onChange={handleNameChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Query</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Enter SQL query"
              value={queryText}
              onChange={handleTextChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default AddQueryModal;
