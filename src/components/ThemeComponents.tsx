import { useTheme } from '../hooks/useTheme';

/**
 * 主题切换组件示例
 * 展示如何在其他组件中使用主题功能
 */
export function ThemeToggle() {
  const { theme, setThemeMode } = useTheme();

  return (
    <button
      onClick={() => setThemeMode(theme.mode === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="切换主题"
    >
      {theme.mode === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

/**
 * 主题色选择器组件
 */
export function ThemeColorPicker() {
  const { theme, setPrimaryColor } = useTheme();

  const presetColors = [
    '#1890ff', // 蓝色
    '#52c41a', // 绿色
    '#fa8c16', // 橙色
    '#f5222d', // 红色
    '#722ed1', // 紫色
    '#13c2c2', // 青色
  ];

  return (
    <div className="flex gap-2">
      {presetColors.map((color) => (
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
  );
}

