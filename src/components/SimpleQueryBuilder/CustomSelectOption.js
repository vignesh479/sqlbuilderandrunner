import React from 'react';

/**
 * Custom Option Component for react-select
 */
const CustomSelectOption = ({ innerProps, innerRef, data, isSelected, isFocused }) => (
  <div
    ref={innerRef}
    {...innerProps}
    className={`p-2 ${isSelected ? 'bg-primary text-white' : ''}`}
    style={{ 
      cursor: 'pointer',
      backgroundColor: isFocused ? '#ffffff0d' : 'transparent'
    }}
  >
    <div className="d-flex align-items-center">
      <div className="flex-grow-1">
        <div className="fw-medium">{data.label}</div>
        <small className={`${isSelected ? 'text-white-50' : 'text-muted'}`}>
          {data.description}
        </small>
      </div>
    </div>
  </div>
);

export default CustomSelectOption;
