
import React from 'react';
import { Button } from '@/components/ui/button';

interface NextButtonProps {
  onClick: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick }) => {
  // Handle WeChat specific touch events in addition to regular click
  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    onClick();
  };

  return (
    <Button 
      className="next-button bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-8 rounded-xl flex items-center justify-center text-lg shadow-lg"
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
    >
      <span className="mr-2">下一步</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </Button>
  );
};

export default NextButton;
