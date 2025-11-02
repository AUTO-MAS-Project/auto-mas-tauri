import React, { useEffect, useState } from 'react';
import { LucideIcon, Minus, Square, X } from 'lucide-react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import WindowTitle from './WindowTitle';

interface WindowControlButtonProps {
    onClick: () => void;
    icon: LucideIcon;
    ariaLabel: string;
    variant?: 'default' | 'close';
    iconSize?: number;
}

const WindowControlButton: React.FC<WindowControlButtonProps> = ({
    onClick,
    icon: Icon,
    ariaLabel,
    variant = 'default',
    iconSize = 14,
}) => {
    const baseClasses =
        'h-8 w-10 flex items-center justify-center transition-colors';
    const variantClasses =
        variant === 'close'
            ? 'hover:bg-red-500 dark:hover:bg-red-600 group'
            : 'hover:bg-gray-200 dark:hover:bg-gray-700';
    const iconClasses =
        variant === 'close'
            ? 'text-gray-700 dark:text-gray-300 group-hover:text-white'
            : 'text-gray-700 dark:text-gray-300';

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variantClasses}`}
            aria-label={ariaLabel}
        >
            <Icon size={iconSize} className={iconClasses} />
        </button>
    );
};

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
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 relative">
            {/* Title bar for window dragging and controls */}
            <div
                data-tauri-drag-region
                className="h-8 bg-gray-50 dark:bg-gray-900 flex items-center px-2 select-none"
            >
                <WindowTitle />
                <div className="absolute right-0 top-0 h-8 flex items-center">
                    <WindowControlButton
                        onClick={minimizeWindow}
                        icon={Minus}
                        ariaLabel="Minimize"
                        iconSize={14}
                    />
                    <WindowControlButton
                        onClick={maximizeWindow}
                        icon={Square}
                        ariaLabel="Maximize"
                        iconSize={12}
                    />
                    <WindowControlButton
                        onClick={closeWindow}
                        icon={X}
                        ariaLabel="Close"
                        variant="close"
                        iconSize={20}
                    />
                </div>
            </div>
        </header>
    );
};

export default CustomHeader;
