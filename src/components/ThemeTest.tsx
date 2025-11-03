import React from 'react';
import { useTheme } from '../hooks/useTheme';

/**
 * 主题测试组件
 * 用于验证新添加的 theme 字段功能
 */
export const ThemeTest: React.FC = () => {
    const { theme, setThemeName } = useTheme();

    return (
        <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                主题测试
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        当前主题名称:
                    </label>
                    <p className="text-lg font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        {theme.theme}
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        主题模式:
                    </label>
                    <p className="text-lg font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        {theme.color_scheme}
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        主题色:
                    </label>
                    <p className="text-lg font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        {theme.primary_color}
                    </p>
                </div>

                <div className="space-y-2">
                    <button
                        onClick={() => setThemeName('custom-theme')}
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        设置为自定义主题
                    </button>

                    <button
                        onClick={() => setThemeName('dark-theme')}
                        className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        设置为暗色主题
                    </button>

                    <button
                        onClick={() => setThemeName('default')}
                        className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        恢复默认主题
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThemeTest;
