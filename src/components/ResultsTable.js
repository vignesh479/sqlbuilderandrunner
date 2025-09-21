import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Table, Alert, Spinner, Badge, Button } from 'react-bootstrap';
import { FaChartBar, FaThumbtack, FaSearch, FaTimes } from 'react-icons/fa';
import LazyLoader from './LazyLoader';
import PaginationControls from './PaginationControls';
import SearchModal from './SearchModal';
import { useTableFiltering } from '../hooks/useTableFiltering';
import { useQueryResults, useQueryLoading } from '../contexts/QueryExecutorContext';

const ResultsTable = () => {
  const { results: data, error, executionTime } = useQueryResults();
  const { isLoading } = useQueryLoading();
  const [pinnedColumn, setPinnedColumn] = useState(null);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(0);

  // Reset currentPageData when data changes to prevent stale pagination
  useEffect(() => {
    setCurrentPageData([]);
    setForceRefresh(prev => prev + 1); // Force re-render of pagination
  }, [data]);

  // Use filtering hook
  const { filteredData, applyFilters, clearFilters, activeFilterCount } = useTableFiltering(data);

  // Memoize table headers
  const headers = useMemo(() => {
    if (!data || data.length === 0 || !data[0]) return [];
    return Object.keys(data[0]);
  }, [data]);

  // Memoize reordered headers and data for performance
  const { reorderedHeaders, reorderedData } = useMemo(() => {
    const dataToUse = filteredData || data;
    if (!dataToUse || dataToUse.length === 0 || !pinnedColumn) {
      return { reorderedHeaders: headers, reorderedData: dataToUse };
    }

    // Move pinned column to first position
    const newHeaders = [pinnedColumn, ...headers.filter(h => h !== pinnedColumn)];
    const newData = dataToUse.map(row => {
      const newRow = {};
      newHeaders.forEach(header => {
        newRow[header] = row[header];
      });
      return newRow;
    });

    return { reorderedHeaders: newHeaders, reorderedData: newData };
  }, [filteredData, data, headers, pinnedColumn]);

  // Handle pin column click with performance optimization
  const handlePinColumn = useCallback((columnName) => {
    setPinnedColumn(prev => prev === columnName ? null : columnName);
  }, []);

  // Handle keyboard navigation for pin column
  const handlePinKeyDown = useCallback((event, columnName) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handlePinColumn(columnName);
    }
  }, [handlePinColumn]);


  // Handle pagination callbacks
  const handlePageChange = useCallback((page, pageData) => {
    setCurrentPageData(pageData);
  }, []);


  const resultsInfo = useMemo(() => {
    if (!data) return null;
    
    const totalRows = data.length;
    const filteredRows = reorderedData.length;
    const isFiltered = activeFilterCount > 0;
    
    return (
      <div className="results-table-info d-flex justify-content-between align-items-center">
        <div className="d-flex gap-2 align-items-center">
          <span className="fw-medium">Query Results</span>
          <Badge bg={isFiltered ? "warning" : "info"}>
            {isFiltered ? `${filteredRows} of ${totalRows}` : `${totalRows}`} rows
          </Badge>
          <Badge bg="secondary">
            {headers.length} columns
          </Badge>
          {pinnedColumn && (
            <Badge bg="primary">
              <FaThumbtack className="me-1" />
              {pinnedColumn}
            </Badge>
          )}
          {isFiltered && (
            <Badge bg="success">
              <FaSearch className="me-1" />
              {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => setShowSearchModal(true)}
          >
            <FaSearch className="me-1" />
            Search & Filter
          </Button>
          {isFiltered && (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={clearFilters}
            >
              <FaTimes className="me-1" />
              Clear Filters
            </Button>
          )}
          {executionTime && (
            <small className="text-muted">
              Executed in {executionTime}ms
            </small>
          )}
        </div>
      </div>
    );
  }, [data, headers.length, executionTime, pinnedColumn, reorderedData?.length, activeFilterCount, clearFilters]);

  if (isLoading) {
    return (
      <div className="results-table p-4 text-center">
        <Spinner animation="border" variant="primary" />
        <div className="mt-2 text-muted">Executing query...</div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="results-table">
        <Alert.Heading className="h6">Query Error</Alert.Heading>
        <p className="mb-0 small">{error}</p>
      </Alert>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="results-table p-4 text-center text-muted">
        <div className="mb-2"><FaChartBar size={24} /></div>
        <div>No results to display</div>
        <small>Run a query to see results here</small>
      </div>
    );
  }

  return (
    <div className="results-table">
      <div className="p-3 border-bottom">
        <h6 className="mb-2">{resultsInfo}</h6>
      </div>
      
      <div className="table-scroll-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <Table striped hover responsive className="mb-0 table-dark" role="table" aria-label="Query results table">
          <thead>
            <tr role="row">
              {reorderedHeaders.map((header, index) => {
                const isPinned = index === 0 && pinnedColumn === header;
                return (
                  <th 
                    key={index} 
                    className={`text-nowrap header-cell ${isPinned ? 'pinned-column' : ''}`}
                    style={{ 
                      minWidth: isPinned ? '120px' : '100px'
                    }}
                    role="columnheader"
                    scope="col"
                  >
                    {header}
                    <button 
                      className="pin-icon btn btn-link p-0 border-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePinColumn(header);
                      }}
                      onKeyDown={(e) => handlePinKeyDown(e, header)}
                      title={`${pinnedColumn === header ? 'Unpin' : 'Pin'} column`}
                      aria-label={`${pinnedColumn === header ? 'Unpin' : 'Pin'} ${header} column`}
                      tabIndex={0}
                    >
                      <FaThumbtack className={pinnedColumn === header ? 'text-warning' : 'text-muted'} />
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="table-body">
            <LazyLoader
              key={`lazy-${forceRefresh}-${reorderedData?.length || 0}`}
              items={currentPageData.length > 0 ? currentPageData : reorderedData} 
              batchSize={20}
              loadBoundary={200}
              scrollContainer=".table-responsive" // Target the scrollable container
            >
              {(row, index) => {
                return (
                  <tr 
                    key={index} 
                    role="row"
                    aria-rowindex={index + 2} // +2 because header is row 1
                  >
                    {reorderedHeaders.map((header, colIndex) => {
                      const isPinned = colIndex === 0 && pinnedColumn === header;
                      return (
                        <td 
                          key={colIndex} 
                          className={`text-truncate ${isPinned ? 'pinned-column' : ''}`}
                          style={{ maxWidth: isPinned ? '150px' : '200px' }}
                          role="cell"
                        >
                          {row[header] !== null && row[header] !== undefined 
                            ? String(row[header]) 
                            : <span className="text-muted">NULL</span>
                          }
                        </td>
                      );
                    })}
                  </tr>
                );
              }}
            </LazyLoader>
          </tbody>
        </Table>
      </div>
      
      {/* Pagination Controls */}
      <PaginationControls
        key={forceRefresh} // Force re-mount when data changes
        data={reorderedData}
        onPageChange={handlePageChange}
        initialPageSize={50}
      />

      {/* Search Modal */}
      <SearchModal
        show={showSearchModal}
        onHide={() => setShowSearchModal(false)}
        data={data}
        onApplyFilters={applyFilters}
        onClearFilters={clearFilters}
      />
    </div>
  );
};

ResultsTable.displayName = 'ResultsTable';

export default ResultsTable;
