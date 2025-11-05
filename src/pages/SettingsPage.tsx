import React from 'react';
import { ColorSchemeMode, useTheme } from '../hooks/useTheme';

const SettingsPage: React.FC = () => {
    const { themeState, themeActions } = useTheme();
    const { theme } = themeState;
    const { setThemeMode, setPrimaryColor, setThemeName } = themeActions;

    const handleThemeModeChange = (mode: ColorSchemeMode) => {
        console.log('设置页面主题模式更改:', mode);
        setThemeMode(mode);
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('设置页面颜色更改:', e.target.value);
        setPrimaryColor(e.target.value);
    };

    const handleThemeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('设置页面主题名称更改:', e.target.value);
        setThemeName(e.target.value as ThemeMode);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                设置
            </h1>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-300 dark:border-gray-700">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                    主题设置
                </h2>

                <div className="mb-6">
                    <label className="block mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">
                        主题模式:
                    </label>
                    <div className="flex gap-4">
                        <button
                            onClick={() => handleThemeModeChange('auto')}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${
                                theme.color_scheme === 'auto'
                                    ? 'bg-blue-500 text-white shadow-md'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                        >
                            自动
                        </button>
                        <button
                            onClick={() => handleThemeModeChange('light')}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${
                                theme.color_scheme === 'light'
                                    ? 'bg-blue-500 text-white shadow-md'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                        >
                            浅色
                        </button>
                        <button
                            onClick={() => handleThemeModeChange('dark')}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${
                                theme.color_scheme === 'dark'
                                    ? 'bg-blue-500 text-white shadow-md'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                        >
                            暗色
                        </button>
                    </div>
                </div>

                <div className="mb-6">
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
                    {/* 添加预设颜色选项 */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {['#1890ff', '#52c41a', '#fa8c16', '#f5222d', '#722ed1', '#13c2c2'].map((color) => (
                            <button
                                key={color}
                                onClick={() => setPrimaryColor(color)}
                                className={`w-8 h-8 rounded-full border-2 transition-all ${
                                    theme.primary_color === color
                                        ? 'border-gray-900 dark:border-gray-100 scale-110'
                                        : 'border-gray-300 dark:border-gray-600 hover:scale-105'
                                }`}
                                style={{ backgroundColor: color }}
                                aria-label={`选择颜色 ${color}`}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">
                        主题名称:
                    </label>
                    <input
                        type="text"
                        value={theme.theme}
                        onChange={handleThemeNameChange}
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
                        placeholder="输入主题名称"
                    />
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;