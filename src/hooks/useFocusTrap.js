import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for implementing focus trap in modals
 * Ensures that tab navigation stays within the modal content
 */
const useFocusTrap = (isActive = false) => {
  const containerRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Get all focusable elements within the container
  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');
    
    return Array.from(containerRef.current.querySelectorAll(focusableSelectors))
      .filter(element => {
        // Additional checks to ensure element is truly focusable
        const style = window.getComputedStyle(element);
        return style.display !== 'none' && 
               style.visibility !== 'hidden' && 
               !element.hasAttribute('aria-hidden');
      });
  }, []);

  // Handle tab key navigation
  const handleTabKey = useCallback((event) => {
    if (!isActive || event.key !== 'Tab') return;
    
    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (event.shiftKey) {
      // Shift + Tab: moving backwards
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab: moving forwards
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }, [isActive, getFocusableElements]);

  // Set up event listeners and initial focus
  useEffect(() => {
    if (!isActive) return;

    // Store the currently focused element before trapping focus
    previousFocusRef.current = document.activeElement;

    // Add event listeners
    document.addEventListener('keydown', handleTabKey);

    // Focus the first focusable element after a short delay
    // to allow the modal to fully render
    const timer = setTimeout(() => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleTabKey);
      
      // Restore focus to the previously focused element
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [isActive, handleTabKey, getFocusableElements]);

  return {
    containerRef,
    focusFirst: useCallback(() => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }, [getFocusableElements]),
    focusLast: useCallback(() => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[focusableElements.length - 1].focus();
      }
    }, [getFocusableElements])
  };
};

export default useFocusTrap;
