use serde::{Deserialize, Serialize};
use std::sync::Arc;
use parking_lot::RwLock;
use tauri::State;

// 主题模式枚举
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "lowercase")]
pub enum ThemeMode {
    Auto,
    Light,
    Dark,
}

// 主题配置结构
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ThemeConfig {
    pub mode: ThemeMode,
    pub primary_color: String,
}

impl ThemeConfig {
    /// 解析主题配置，将 Auto 模式转换为具体的 Light 或 Dark 模式
    pub fn resolved(&self) -> ThemeConfig {
        let resolved_mode = match self.mode {
            ThemeMode::Auto => {
                // 获取系统主题模式
                get_system_theme()
            },
            _ => self.mode.clone(),
        };

        ThemeConfig {
            mode: resolved_mode,
            primary_color: self.primary_color.clone(),
        }
    }
}

impl Default for ThemeConfig {
    fn default() -> Self {
        Self {
            mode: ThemeMode::Auto,
            primary_color: "#1890ff".to_string(),
        }
    }
}

// 主题状态管理
pub struct ThemeState {
    config: Arc<RwLock<ThemeConfig>>,
}

impl ThemeState {
    pub fn new() -> Self {
        Self {
            config: Arc::new(RwLock::new(ThemeConfig::default())),
        }
    }

    pub fn get_config(&self) -> ThemeConfig {
        self.config.read().resolved()
    }

    pub fn set_config(&self, config: ThemeConfig) {
        *self.config.write() = config;
    }
}

/// 获取系统主题模式
fn get_system_theme() -> ThemeMode {
    // 仅在 Windows 上实现获取系统主题，其他平台默认返回 Light
    #[cfg(target_os = "windows")]
    {
        // 尝试获取 Windows 系统主题设置
        // 这里使用 winapi 或 windows crate 来获取系统主题
        // 简化实现，实际应该调用系统 API 检查当前主题
        match std::process::Command::new("reg")
            .args(&[
                "query",
                "HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize",
                "/v",
                "AppsUseLightTheme"
            ])
            .output() {
                Ok(output) => {
                    // 解析命令输出
                    let output_str = String::from_utf8_lossy(&output.stdout);
                    if output_str.contains("0x0") {
                        // 0 表示深色主题
                        ThemeMode::Dark
                    } else {
                        // 1 或其他值表示浅色主题
                        ThemeMode::Light
                    }
                },
                Err(_) => {
                    // 如果无法获取注册表信息，默认使用浅色主题
                    ThemeMode::Light
                }
            }
    }
    
    #[cfg(not(target_os = "windows"))]
    {
        // 其他平台默认使用 Light 主题
        ThemeMode::Light
    }
}

// 获取主题配置
#[tauri::command]
pub fn get_theme(state: State<ThemeState>) -> Result<ThemeConfig, String> {
    Ok(state.get_config())
}

// 设置主题配置
#[tauri::command]
pub fn set_theme(
    theme: ThemeConfig,
    state: State<ThemeState>,
) -> Result<ThemeConfig, String> {
    state.set_config(theme.clone());
    // 返回更新后的配置，让前端可以确认
    Ok(state.get_config())
}