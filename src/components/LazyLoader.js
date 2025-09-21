import React, { useState, useRef, useEffect, useCallback } from "react";

function LazyLoader({ 
  items = [], 
  batchSize = 10, 
  children, 
  scrollContainer = null 
}) {
  const [renderedItems, setRenderedItems] = useState(() => {
    return items && Array.isArray(items) ? items.slice(0, batchSize) : [];
  });
  const componentRef = useRef(null);
  const scrollParentRef = useRef(null);

  // Reset rendered items when items or batchSize changes
  useEffect(() => {
    if (items && Array.isArray(items)) {
      setRenderedItems(items.slice(0, batchSize));
    } else {
      setRenderedItems([]);
    }
  }, [items, batchSize]);

  // Check if scrolled to bottom
  const isScrolledToBottom = useCallback(() => {
    if (!componentRef.current || !scrollParentRef.current) return false;
    
    const element = componentRef.current;
    const scrollParent = scrollParentRef.current;
    
    // Get element's bottom position relative to viewport
    const rect = element.getBoundingClientRect();
    
    // Get viewport height (either window or scrollable container)
    const viewportHeight = scrollParent === window ? 
      window.innerHeight : 
      scrollParent.clientHeight;
    
    // Calculate distance from element bottom to viewport bottom
    const distanceToBottom = rect.bottom - viewportHeight;
    
    // Return true if we're within the boundary
    return distanceToBottom < 500;
  }, []);

  // Load more items when scrolled near bottom
  const handleScroll = useCallback(() => {
    if (!items || !Array.isArray(items) || renderedItems.length >= items.length) return; // All items loaded
    
    if (isScrolledToBottom()) {
      setRenderedItems(prev => {
        const next = items.slice(prev.length, prev.length + batchSize);
        return [...prev, ...next]; // append instead of rerender all
      });
    }
  }, [items, batchSize, renderedItems.length, isScrolledToBottom]);

  // Setup scroll event listener
  useEffect(() => {
    // Determine scroll parent (defaults to window)
    const scrollParent = scrollContainer ? 
      document.querySelector(scrollContainer) : 
      window;
    
    scrollParentRef.current = scrollParent;
    componentRef.current = document.querySelector('.table-body');

    
    if (scrollParent) {
      scrollParent.addEventListener('scroll', handleScroll);
      
      // Initial check in case content doesn't fill the screen
      setTimeout(handleScroll, 100);
      
      return () => {
        scrollParent.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll, scrollContainer]);

  return (
    <>
      {renderedItems.map((item, index) => (
        <React.Fragment key={index}>{children(item, index)}</React.Fragment>
      ))}
    </>
  );
}

export default LazyLoader;