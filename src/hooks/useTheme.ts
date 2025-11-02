import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { UnlistenFn } from '@tauri-apps/api/event';

// 前端使用的主题模式（包含auto）
export type ThemeMode = 'auto' | 'light' | 'dark';

export interface ThemeConfig {
  mode: ThemeMode;
  primary_color: string;
}

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeConfig>({
    mode: 'auto',
    primary_color: '#1890ff',
  });
  const [loading, setLoading] = useState(true);
  const [unlisten, setUnlisten] = useState<UnlistenFn | null>(null);

  // 获取主题配置
  const loadTheme = async () => {
    try {
      setLoading(true);
      const config = await invoke<ThemeConfig>('get_theme');
      setTheme(config);
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
      
      const result = await invoke<ThemeConfig>('set_theme', { theme: updatedTheme });
      setTheme(result);
      applyTheme(result);
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
    
    // 监听来自后端的主题变更事件
    listen<ThemeConfig>('theme-changed', (event) => {
      setTheme(event.payload);
      applyTheme(event.payload);
    }).then(setUnlisten);
    
    return () => {
      if (unlisten) {
        unlisten();
      }
    };
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

  // 使用主题的部分 - 提供主题状态和加载状态
  const themeState = {
    theme,
    loading,
  };

  // 修改主题的部分 - 提供所有修改主题的方法
  const themeActions = {
    setThemeMode,
    setPrimaryColor,
    updateTheme,
  };

  return {
    ...themeState,
    ...themeActions,
  };
};