use serde::{Deserialize, Serialize};
use std::sync::Arc;
use parking_lot::RwLock;
use tauri::{State, AppHandle};
use tauri::Emitter;

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
    pub color_scheme: ThemeMode,
    pub primary_color: String,
    pub theme: String,
}

impl Default for ThemeConfig {
    fn default() -> Self {
        Self {
            color_scheme: ThemeMode::Auto,
            primary_color: "#1890ff".to_string(),
            theme: "default".to_string(),
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
        self.config.read().clone()
    }

    pub fn set_config<R: tauri::Runtime>(&self, config: ThemeConfig, app_handle: &AppHandle<R>) {
        println!("更新主题配置: {:?}", config);
        *self.config.write() = config.clone();
        
        // 向所有窗口广播主题变更事件
        match app_handle.emit("theme-changed", &config) {
            Ok(_) => println!("成功发送 theme-changed 事件"),
            Err(e) => println!("发送 theme-changed 事件失败: {}", e),
        }
    }
}

// 获取主题配置
#[tauri::command]
pub fn get_theme(state: State<ThemeState>) -> Result<ThemeConfig, String> {
    Ok(state.get_config())
}

// 设置主题配置
#[tauri::command]
pub fn set_theme<R: tauri::Runtime>(
    theme: ThemeConfig,
    state: State<ThemeState>,
    app_handle: AppHandle<R>,
) -> Result<ThemeConfig, String> {
    println!("收到设置主题请求: {:?}", theme);
    state.set_config(theme.clone(), &app_handle);
    // 返回更新后的配置，让前端可以确认
    let config = state.get_config();
    println!("主题设置完成，返回配置: {:?}", config);
    Ok(config)
}