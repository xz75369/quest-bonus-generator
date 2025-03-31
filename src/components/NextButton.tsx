
import React from 'react';

interface NextButtonProps {
  onClick: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick }) => {
  return (
    <button 
      className="next-button animate-pulse-light bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-3 px-6 rounded-lg flex items-center justify-center text-lg shadow-lg hover:shadow-xl transition-all duration-300" 
      onClick={onClick}
    >
      <span className="mr-2">下一步</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </button>
  );
};

export default NextButton;
