// ScrollToTop.js
import React from 'react';
import './ScrollToTop.css';

const ScrollToTop = ({ isVisible }) => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button 
      className={`scroll-to-top ${isVisible ? 'show' : ''}`} 
      onClick={handleScrollToTop}
    >
      ↑
    </button>
  );
};

export default ScrollToTop;
