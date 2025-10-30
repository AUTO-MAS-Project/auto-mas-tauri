import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';

// 前端使用的主题模式（包含auto）
export type ThemeMode = 'auto' | 'light' | 'dark';

// 发送给后端的主题模式（不包含auto）
type BackendThemeMode = 'light' | 'dark';

export interface ThemeConfig {
  mode: ThemeMode;
  primary_color: string;
}

// 发送给后端的主题配置接口
interface BackendThemeConfig {
  mode: BackendThemeMode;
  primary_color: string;
}

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeConfig>({
    mode: 'auto',
    primary_color: '#1890ff',
  });
  const [loading, setLoading] = useState(true);

  // 获取主题配置
  const loadTheme = async () => {
    try {
      setLoading(true);
      // 后端返回的是已解析的模式（light或dark），不包含auto
      const config = await invoke<{ mode: 'light' | 'dark'; primary_color: string }>('get_theme');
      setTheme({
        mode: config.mode as ThemeMode, // 虽然后端不返回auto，但在前端我们仍可能需要使用auto模式
        primary_color: config.primary_color,
      });
    } catch (error) {
      console.error('Failed to load theme:', error);
    } finally {
      setLoading(false);
    }
  };

  // 更新主题配置
  const updateTheme = async (newTheme: Partial<ThemeConfig>) => {
    try {
      const updatedTheme = { ...theme, ...newTheme };
      
      // 准备发送给后端的主题配置（必须是light或dark）
      let backendTheme: BackendThemeConfig = {
        mode: 'light', // 默认值
        primary_color: updatedTheme.primary_color
      };
      
      // 处理不同的主题模式
      switch (updatedTheme.mode) {
        case 'auto':
          // 当使用auto模式时，根据系统偏好设置确定具体的模式
          const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          backendTheme.mode = systemPrefersDark ? 'dark' : 'light';
          break;
        case 'light':
        case 'dark':
          // 直接使用指定的模式
          backendTheme.mode = updatedTheme.mode;
          break;
      }
      
      await invoke('set_theme', { theme: backendTheme });
      setTheme(updatedTheme);
      applyTheme(updatedTheme);
    } catch (error) {
      console.error('Failed to update theme:', error);
    }
  };

  // 应用主题到 DOM (TailwindCSS dark mode)
  const applyTheme = (config: ThemeConfig) => {
    const root = document.documentElement;

    // 解析最终应用于界面的主题模式
    let resolvedMode: 'light' | 'dark' = 'light';
    switch (config.mode) {
      case 'auto':
        resolvedMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        break;
      case 'light':
      case 'dark':
        resolvedMode = config.mode;
        break;
    }

    // TailwindCSS dark mode
    if (resolvedMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // 设置主题色 CSS 变量
    root.style.setProperty('--primary-color', config.primary_color);
  };

  // 设置主题模式
  const setThemeMode = (mode: ThemeMode) => {
    updateTheme({ mode });
  };

  // 设置主题色
  const setPrimaryColor = (color: string) => {
    updateTheme({ primary_color: color });
  };

  useEffect(() => {
    loadTheme();
  }, []);

  // 监听系统主题偏好变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      // 只有在使用auto模式时才需要响应系统主题变化
      if (!loading && theme.mode === 'auto') {
        applyTheme(theme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, loading]);

  // 应用主题
  useEffect(() => {
    if (!loading) {
      applyTheme(theme);
    }
  }, [theme, loading]);

  return {
    theme,
    loading,
    setThemeMode,
    setPrimaryColor,
    updateTheme,
  };
};