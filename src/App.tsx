import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { useTheme, ThemeMode } from "./hooks/useTheme";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const { theme, loading, setThemeMode, setPrimaryColor } = useTheme();

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  const handleThemeModeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrimaryColor(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="text-lg">Loading theme...</div>
      </div>
    );
  }

  return (
    <main className="container min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to Tauri + React</h1>

        {/* 主题控制面板 */}
        <div className="p-6 mb-8 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">主题设置</h2>

          <div className="mb-4">
            <label className="block mb-2 font-medium">主题模式:</label>
            <div className="flex gap-4">
              <button
                onClick={() => handleThemeModeChange('light')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  theme.mode === 'light'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                浅色
              </button>
              <button
                onClick={() => handleThemeModeChange('dark')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  theme.mode === 'dark'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                暗色
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">主题色:</label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={theme.primary_color}
                onChange={handleColorChange}
                className="w-16 h-10 rounded cursor-pointer border-2 border-gray-300 dark:border-gray-600"
              />
              <span className="text-sm font-mono bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded">
                {theme.primary_color}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-8 mb-8">
          <a href="https://vite.dev" target="_blank" className="transition-transform hover:scale-110">
            <img src="/vite.svg" className="w-24 h-24" alt="Vite logo" />
          </a>
          <a href="https://tauri.app" target="_blank" className="transition-transform hover:scale-110">
            <img src="/tauri.svg" className="w-24 h-24" alt="Tauri logo" />
          </a>
          <a href="https://react.dev" target="_blank" className="transition-transform hover:scale-110">
            <img src={reactLogo} className="w-24 h-24" alt="React logo" />
          </a>
        </div>

        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Click on the Tauri, Vite, and React logos to learn more.
        </p>

        <form
          className="flex justify-center gap-2 mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Greet
          </button>
        </form>

        {greetMsg && (
          <p className="text-center text-lg font-semibold">{greetMsg}</p>
        )}
      </div>
    </main>
  );
}

export default App;
