# SqlBuilderAndExecutor

A SQL query builder and executor built with React.

## Walkthrough Video

[Link Text](https://drive.google.com/file/d/11Hd5kkTZ321xIFWy0GohzsOoHOjEC-LC/view?usp=sharing)

## 🛠️ Technical Architecture

### **Build System & Bundling**
- **Create React App (CRA)**: Established React toolchain with Webpack 5
- **Webpack Bundle Optimization**: Tree shaking, code splitting, and asset optimization
- **Hot Module Replacement**: Fast development with instant updates
- **Modern JavaScript**: Babel transpilation with browserslist configuration
- **Production Ready**: Minification, compression, and performance optimizations

### **Performance Monitoring**
The application includes built-in performance monitoring to track load times:

```javascript
// Performance measurement implementation (src/index.js)
window.addEventListener("load", function() {
  setTimeout(() => {
    const perf = window.performance.getEntriesByType("navigation")[0];
    const loadTime = perf.loadEventEnd - perf.requestStart;
    console.log(`Load time: ${loadTime}ms`);
  }, 0);
});
```

**Current Performance Metrics:**
- ⚡ **Initial Load Time**: ~750ms (measured from request start to load complete)

**Measurement Methodology:**
- Uses **Navigation Timing API** for accurate browser-level measurements
- Captures **end-to-end load time** from network request to DOM ready
- **Console logging** for easy development monitoring

### **Performance Optimizations**
- **React.memo**: All components optimized with memoization
- **useMemo & useCallback**: Intelligent caching of expensive operations
- **Debounced Validation**: Smart input validation with performance considerations
- **Virtual Scrolling**: Handle large datasets without performance degradation
- **Context-based State**: Efficient global state management

### **Advanced Components**
```
src/
├── components/
│   ├── QueryEditor.js           # Advanced SQL editor with shortcuts
│   ├── ResultsTable.js          # High-performance data table
│   ├── PaginationControls.js    # Smart pagination system
│   ├── SearchModal.js           # Advanced filtering interface
│   ├── LazyLoader.js            # Virtual scrolling implementation
│   └── SimpleQueryBuilder/      # Visual query builder components
│       ├── SimpleQueryBuilder.js
│       ├── TableSelectionCard.js
│       ├── ConditionsCard.js
│       ├── SortingAndLimitsCard.js
│       └── QueryPreviewCard.js
├── hooks/
│   ├── useFocusTrap.js          # Modal accessibility
│   ├── useQueryBuilder.js       # Query builder state management
│   ├── useQueryGeneration.js    # SQL generation logic
│   ├── useQueryValidation.js    # Input validation
│   └── useTableFiltering.js     # Advanced filtering logic
├── contexts/
│   └── QueryExecutorContext.js  # Global query state
└── constants/
    ├── availableTables.js       # Database schema definitions
    ├── headerTypes.js           # Column type mapping
    ├── operators.js             # Filter operators
    └── mockData.js              # Sample data
```

## 🚀 Key Features

### 🎯 **Dual Query Modes**
- **Simple Query Builder**: Interface for creating complex SQL queries easily.
- **SQL Editor**: Textarea to enter the sql queries

### ⚡ **Performance & UX**
- **Smart Pagination**: Compact pagination with configurable page sizes (10-10,000 rows)
- **Lazy Loading**: Efficient rendering of large datasets with virtual scrolling
- **Advanced Search & Filtering**: Real-time table filtering with multiple operators
- **Table Interactions**: Pin columns, keyboard navigation (arrow keys, tab)
- **Sidebar with Custom queries**: Create or select custom queries that you execute often for better user experience

### 🔍 **Advanced Data Exploration**
- **Dynamic Column Pinning**: Pin important columns to the left
- **Intelligent Search**: Global search modal with type-aware filtering
- **Result Export**: Export filtered results to various formats
- **Query History**: Recent queries dropdown with quick access

### ⌨️ **Keyboard Shortcuts**
- **Ctrl+/**: Open Simple Query Builder
- **Ctrl+Enter**: Execute current query
- **Tab**: Navigate through interactive elements

### ♿ **Accessibility First**
- **Screen Reader Friendly**: Comprehensive ARIA labels and roles
- **Focus Management**: Proper focus trapping in modals
- **High Contrast**: Accessible color schemes and visual indicators

### 📱 **Responsive Design**
- **Mobile Optimized**: Touch-friendly interface for tablets and phones
- **Adaptive Layout**: Dynamic UI adjustments for different screen sizes
- **Progressive Enhancement**: Core functionality works on all devices

## 🏁 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd AtlanSqlBuilder

# Install dependencies
npm install

# Start development server
npm start

# Open your browser to http://localhost:3000
```

## 📦 Dependencies

This project uses the following third-party dependencies:

### Core Framework
- **React** (^18.2.0) - JavaScript library for building user interfaces
- **React DOM** (^18.2.0) - React rendering library for the web

### UI Components & Styling
- **Bootstrap** (^5.3.0) - CSS framework for responsive design
- **React Bootstrap** (^2.8.0) - Bootstrap components rebuilt for React
- **React Icons** (^5.5.0) - Popular icon library for React applications

### Form Controls & Interactions
- **React Select** (^5.10.2) - Flexible and beautiful Select Input control for ReactJS

### Utilities
- **Lodash Debounce** (^4.0.8) - Debounce function for performance optimization

### Build Tools
- **React Scripts** (5.0.1) - Create React App build scripts and configuration

## 📖 Usage Guide

### **Visual Query Builder**
1. **Select Tables**: Choose your main table and related tables for joins
2. **Choose Columns**: Multi-select columns with type-aware filtering
3. **Add Conditions**: Visual filter builder with intelligent operators
4. **Configure Sorting**: Order results by any column
5. **Set Limits**: Control result size for performance
6. **Generate & Run**: Auto-generate SQL and execute

### **Advanced SQL Editor**
1. **Write Queries**: Full SQL support with syntax validation
2. **Use Shortcuts**: Ctrl+/ for builder, Ctrl+Enter to execute
3. **Query History**: Access recent queries from dropdown
4. **Error Handling**: Real-time validation with helpful messages

### **Data Exploration**
1. **Browse Results**: Paginated table with smart navigation
2. **Filter Data**: Advanced search modal with type-aware operators
3. **Pin Columns**: Keep important columns visible while scrolling
4. **Navigate**: Use keyboard arrows and tab for accessibility

## 🎨 Customization

### **Theme Configuration**
The application uses CSS custom properties for easy theming:

```css
:root {
  --bg-primary: #0f1419;
  --bg-secondary: #1a1f2e;
  --text-primary: #ffffff;
  --accent-primary: #00d4ff;
  --border-color: #2d3748;
}
```

## 🔧 Advanced Features

### **Accessibility Features**
- **Focus trapping**: Modals keep focus within boundaries
- **Keyboard navigation**: Full app navigation without mouse
- **Screen reader support**: Comprehensive ARIA labels

### **Performance Features**
- **Virtual scrolling**: Handle thousands of rows efficiently
- **Smart pagination**: Show only relevant page numbers
- **Debounced inputs**: Prevent excessive API calls
- **Memoized components**: Optimal React rendering
