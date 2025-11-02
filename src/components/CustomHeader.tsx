import React, { useState, useEffect } from 'react';
import { Minus, Square, X } from 'lucide-react';
import { getCurrentWindow } from '@tauri-apps/api/window';

const CustomHeader: React.FC = () => {
  const appWindow = getCurrentWindow();
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    // 初始化时检查窗口是否已最大化
    const checkMaximized = async () => {
      try {
        const maximized = await appWindow.isMaximized();
        setIsMaximized(maximized);
      } catch (e) {
        console.error('Failed to check if window is maximized:', e);
      }
    };
    
    checkMaximized();
  }, []);

  const minimizeWindow = async () => {
    try {
      await appWindow.minimize();
    } catch (e) {
      console.error('Failed to minimize window:', e);
    }
  };

  const maximizeWindow = async () => {
    try {
      if (isMaximized) {
        await appWindow.unmaximize();
        setIsMaximized(false);
      } else {
        await appWindow.maximize();
        setIsMaximized(true);
      }
    } catch (e) {
      console.error('Failed to maximize/unmaximize window:', e);
    }
  };

  const closeWindow = async () => {
    try {
      await appWindow.close();
    } catch (e) {
      console.error('Failed to close window:', e);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      {/* Title bar for window dragging and controls */}
      <div
        data-tauri-drag-region
        className="h-8 bg-gray-50 dark:bg-gray-900 flex items-center justify-between px-2 select-none data-tauri-drag-region"
      >
        <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 font-medium data-tauri-drag-region">
          <span className="ml-2">Auto-MAS</span>
        </div>
        <div className="flex items-center">
          <button
            onClick={minimizeWindow}
            className="h-8 w-10 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
            aria-label="Minimize"
          >
            <Minus size={14} className="text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={maximizeWindow}
            className="h-8 w-10 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
            aria-label="Maximize"
          >
            <Square size={12} className="text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={closeWindow}
            className="h-8 w-10 hover:bg-red-500 dark:hover:bg-red-600 flex items-center justify-center transition-colors group"
            aria-label="Close"
          >
            <X size={16} className="text-gray-700 dark:text-gray-300 group-hover:text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default CustomHeader;