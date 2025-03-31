
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

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
    <div className="fixed bottom-28 right-4 z-50">
      <Button 
        className="next-button bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-8 rounded-xl flex items-center justify-center text-lg shadow-lg"
        onClick={handleInteraction}
        onTouchStart={handleInteraction}
      >
        <span className="mr-2">下一步</span>
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default NextButton;
