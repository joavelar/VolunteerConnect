import React from 'react';

const CloseIcon = (props) => (
  <svg
    width="36" 
    height="36" 
    viewBox="0 0 36 36" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    {...props} // This allows you to pass other props to the SVG element, like className, style, etc.
  >
    <path 
      d="M4 4L18 18M32 32L18 18M18 18L4 32M18 18L32 4" 
      stroke="#1C1258" 
      strokeWidth="7" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export default CloseIcon;
