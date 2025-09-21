import React from 'react';
import NavigationBar from './components/Navbar';
import MainContent from './components/MainContent';
import { QueryExecutorProvider } from './contexts/QueryExecutorContext';

/**
 * Main App Component
 * Provides query execution context and renders the main layout
 */
const App = () => {
  return (
    <QueryExecutorProvider>
      <div className="sql-builder-container">
        <NavigationBar />
        <MainContent />
      </div>
    </QueryExecutorProvider>
  );
};

export default App;
