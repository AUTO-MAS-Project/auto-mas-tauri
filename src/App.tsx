import { useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import './App.css';
import { AppRoutes } from './routes';
import { useTheme } from './hooks/useTheme';

function App() {
    // 使用主题 hook
    const { themeState } = useTheme();
    const { loading } = themeState;

    useEffect(() => {
        /**
         * 初始化应用
         * 在主题加载完成后显示主窗口
         */
        const initializeApp = async () => {
            // 等待主题加载完成
            if (!loading) {
                try {
                    // 调用后端显示主窗口
                    await invoke('show_main_window');
                    console.log('主窗口已显示');
                } catch (error) {
                    console.error('显示主窗口失败:', error);
                }
            }
        };

        initializeApp();
    }, [loading]); // 监听 loading 状态变化

    return <AppRoutes />;
}

export default App;
