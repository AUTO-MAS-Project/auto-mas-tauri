use tauri::Manager;

mod theme;
use theme::{ThemeState, get_theme, set_theme};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_websocket::init())
        .plugin(tauri_plugin_single_instance::init(|_app, _args, _cwd| {}))
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            app.manage(ThemeState::new());
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, get_theme, set_theme])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
