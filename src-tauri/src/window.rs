use tauri::{AppHandle, Manager};

/// 显示主窗口
///
/// 此命令用于在前端初始化完成后显示主窗口
/// 主要用于避免窗口初始化时的主题闪烁问题
///
/// # 参数
/// * `app` - Tauri 应用句柄
///
/// # 返回
/// * `Ok(())` - 成功显示窗口
/// * `Err(String)` - 显示窗口失败时返回错误信息
#[tauri::command]
pub async fn show_main_window(app: AppHandle) -> Result<(), String> {
    // 获取主窗口实例
    if let Some(window) = app.get_webview_window("main") {
        // 显示窗口
        window.show().map_err(|e| e.to_string())?;
        // 聚焦窗口
        window.set_focus().map_err(|e| e.to_string())?;
        Ok(())
    } else {
        Err("Main window not found".to_string())
    }
}

/// 隐藏主窗口
///
/// 此命令用于隐藏主窗口
///
/// # 参数
/// * `app` - Tauri 应用句柄
///
/// # 返回
/// * `Ok(())` - 成功隐藏窗口
/// * `Err(String)` - 隐藏窗口失败时返回错误信息
#[tauri::command]
pub async fn hide_main_window(app: AppHandle) -> Result<(), String> {
    // 获取主窗口实例
    if let Some(window) = app.get_webview_window("main") {
        // 隐藏窗口
        window.hide().map_err(|e| e.to_string())?;
        Ok(())
    } else {
        Err("Main window not found".to_string())
    }
}

