import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';


// Performance monitoring
window.addEventListener("load", function() {
  // wrapping this in a setTimeout(() => {}, 0) so the onLoad event completes first and gives accurate timing
  setTimeout(() => {
    const perf = window.performance.getEntriesByType("navigation")[0];
    const loadTime = perf.loadEventEnd - perf.requestStart;
    console.log(`Load time: ${loadTime}ms`);
  }, 0);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
