import React, { useCallback, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import QueryEditor from './QueryEditor';
import Sidebar from './Sidebar';
import ResultsTable from './ResultsTable';

const MainContent = () => {
  const queryEditorRef = useRef(null);

  const handleQuerySelect = useCallback((query) => {
    // Directly call the QueryEditor's method without causing re-render
    if (queryEditorRef.current) {
      queryEditorRef.current.setQuery(query);
    }
  }, []);

  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        <Sidebar onQuerySelect={handleQuerySelect} />
        <Col xs={12} md={9} lg={10} className="main-content overflow-auto">
          <div className="p-4">
            <QueryEditor ref={queryEditorRef} />
            <ResultsTable />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

MainContent.displayName = 'MainContent';

export default MainContent;
