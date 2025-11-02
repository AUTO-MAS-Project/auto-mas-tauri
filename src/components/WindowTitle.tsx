import React from 'react';

interface WindowTitleProps {
  title?: string;
}

const WindowTitle: React.FC<WindowTitleProps> = ({ title = "Auto-MAS" }) => {
  return (
    <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 font-medium rounded-none shadow-none">
      <span className="ml-2">{title}</span>
    </div>
  );
};

export default WindowTitle;