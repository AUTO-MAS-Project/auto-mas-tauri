import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { listen, UnlistenFn } from '@tauri-apps/api/event';

// 主题模式类型 - 自动|浅色|深色
export type ColorSchemeMode = 'auto' | 'light' | 'dark';
// 主题名称类型 - 浅色|深色 - 预留
export type ThemeMode = 'light' | 'dark' | 'default';
// 主题配置
export interface ThemeConfig {
    // 主题模式 - 自动|浅色|深色
    color_scheme: ColorSchemeMode;
    // 主题色
    primary_color: string;
    // 主题名称
    theme: ThemeMode;
}

export const useTheme = () => {
    const [theme, setTheme] = useState<ThemeConfig>({
        color_scheme: 'auto',
        primary_color: '#1890ff',
        theme: 'default',
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

            const result = await invoke<ThemeConfig>('set_theme', {
                theme: updatedTheme,
            });
            setTheme(result);
            applyTheme(result);
        } catch (error) {
            console.error('Failed to update theme:', error);
        }
    };

    // 应用主题到 DOM
    const applyTheme = (config: ThemeConfig) => {
        const root = document.documentElement;

        // 解析最终应用于界面的主题模式
        let resolvedMode: 'light' | 'dark' = 'light';
        switch (config.color_scheme) {
            case 'auto':
                resolvedMode =
                    window.matchMedia &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches
                        ? 'dark'
                        : 'light';
                break;
            case 'light':
            case 'dark':
                resolvedMode = config.color_scheme;
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
    const setThemeMode = (color_scheme: ColorSchemeMode) => {
        updateTheme({ color_scheme });
    };

    // 设置主题色
    const setPrimaryColor = (color: string) => {
        updateTheme({ primary_color: color });
    };

    // 设置主题名称
    const setThemeName = (themeName: ThemeMode) => {
        updateTheme({ theme: themeName });
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
            if (!loading && theme.color_scheme === 'auto') {
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
        setThemeName,
        updateTheme,
    };

    return {
        ...themeState,
        ...themeActions,
    };
};
