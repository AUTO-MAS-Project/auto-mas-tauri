/**
 * 根据主题配置更新CSS变量
 * 
 * @param config - 主题配置
 */
export const updateCSSVariables = (config: {
    color_scheme: 'auto' | 'light' | 'dark';
    primary_color: string;
    theme: string;
}) => {
    console.log('正在应用主题到 DOM:', config);
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
            console.log('自动模式解析为:', resolvedMode);
            break;
        case 'light':
        case 'dark':
            resolvedMode = config.color_scheme;
            console.log('固定模式设置为:', resolvedMode);
            break;
    }

    // TailwindCSS dark mode
    if (resolvedMode === 'dark') {
        root.classList.add('dark');
        console.log('添加 dark 类');
    } else {
        root.classList.remove('dark');
        console.log('移除 dark 类');
    }

    // 设置主题色 CSS 变量
    root.style.setProperty('--primary-color', config.primary_color);
    console.log('设置主题色 CSS 变量:', config.primary_color);
};