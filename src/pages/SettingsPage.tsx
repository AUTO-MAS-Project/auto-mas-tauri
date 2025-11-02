import React from "react";
import { useTheme, ThemeMode } from "../hooks/useTheme";

const SettingsPage: React.FC = () => {
  const { theme, setThemeMode, setPrimaryColor } = useTheme();

  const handleThemeModeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrimaryColor(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">设置</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-300 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">主题设置</h2>
        
        <div className="mb-6">
          <label className="block mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">
            主题模式:
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => handleThemeModeChange('light')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                theme.mode === 'light'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              浅色
            </button>
            <button
              onClick={() => handleThemeModeChange('dark')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                theme.mode === 'dark'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              暗色
            </button>
          </div>
        </div>
        
        <div>
          <label className="block mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">
            主题色:
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={theme.primary_color}
              onChange={handleColorChange}
              className="w-16 h-10 rounded cursor-pointer border-2 border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm font-mono bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded text-gray-700 dark:text-gray-300">
              {theme.primary_color}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;