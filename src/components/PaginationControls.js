import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Pagination, Dropdown, Badge } from 'react-bootstrap';

/**
 * PaginationControls Component
 * Handles pagination logic and UI for data tables
 */
const PaginationControls = React.memo(({ 
  data = [], 
  onPageChange, 
  onPageSizeChange,
  initialPageSize = 50,
  pageSizeOptions = [10, 50, 100, 200, 1000, 5000, 10000]
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Reset pagination when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  // Calculate pagination values
  const paginationInfo = useMemo(() => {
    if (!data || data.length === 0) {
      return { totalPages: 0, startIndex: 0, endIndex: 0, totalRows: 0 };
    }

    const totalRows = data.length;
    const totalPages = Math.ceil(totalRows / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalRows);

    return { totalPages, startIndex, endIndex, totalRows };
  }, [data, currentPage, pageSize]);

  // Get current page data
  const currentPageData = useMemo(() => {
    if (!data?.length) return [];
    const { startIndex, endIndex } = paginationInfo;
    return data.slice(startIndex, endIndex);
  }, [data, paginationInfo]);

  // Handle page changes
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    if (onPageChange) {
      onPageChange(page, currentPageData);
    }
  }, [onPageChange, currentPageData]);

  // Trigger initial page change when component mounts or data changes
  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage, currentPageData);
    }
  }, [onPageChange, currentPageData, currentPage]);

  const handlePageSizeChange = useCallback((newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
    if (onPageSizeChange) {
      onPageSizeChange(newPageSize);
    }
  }, [onPageSizeChange]);

  // Generate page numbers with smart truncation
  const renderPageNumbers = useCallback(() => {
    const pages = [];
    const totalPages = paginationInfo.totalPages;
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);
    
    // Adjust range to always show 2 pages if possible
    if (endPage - startPage < 1) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - 1);
      }
    }
    
    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(
        <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        pages.push(<Pagination.Ellipsis key="start-ellipsis" />);
      }
    }
    
    // Add page numbers in range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Pagination.Item 
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    
    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<Pagination.Ellipsis key="end-ellipsis" />);
      }
      pages.push(
        <Pagination.Item key={totalPages} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </Pagination.Item>
      );
    }
    
    return pages;
  }, [paginationInfo.totalPages, currentPage, handlePageChange]);

  // Don't render if no data
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="pagination-container p-3 border-top d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-3">
        <span className="text-muted small">Rows per page:</span>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" size="sm" className="pagination-dropdown" aria-label="Select number of rows per page">
            {pageSize}
          </Dropdown.Toggle>
          <Dropdown.Menu className="pagination-dropdown-menu">
            {pageSizeOptions.map(size => (
              <Dropdown.Item 
                key={size}
                active={pageSize === size}
                onClick={() => handlePageSizeChange(size)}
              >
                {size}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        
        <span className="text-muted small">
          Page {currentPage} of {paginationInfo.totalPages}
        </span>
        {paginationInfo.totalRows > 0 && (
          <Badge bg="dark">
            Showing {paginationInfo.startIndex + 1}-{paginationInfo.endIndex} of {paginationInfo.totalRows}
          </Badge>
        )}
      </div>
      
      {paginationInfo.totalPages > 1 && (
        <Pagination className="mb-0 pagination-custom">
          <Pagination.First 
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          />
          <Pagination.Prev 
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          />
          
          {renderPageNumbers()}
          
          <Pagination.Next 
            disabled={currentPage === paginationInfo.totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          />
          <Pagination.Last 
            disabled={currentPage === paginationInfo.totalPages}
            onClick={() => handlePageChange(paginationInfo.totalPages)}
          />
        </Pagination>
      )}
    </div>
  );
});

PaginationControls.displayName = 'PaginationControls';

export default PaginationControls;
