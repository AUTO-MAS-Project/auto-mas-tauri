import React, { useState } from "react";
import reactLogo from "../assets/react.svg";
import { invoke } from "@tauri-apps/api/core";

const HomePage: React.FC = () => {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Tauri + React
        </h1>
        
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

        <p className="text-gray-600 dark:text-gray-400 mb-8">
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
          <p className="text-center text-lg font-semibold text-gray-900 dark:text-white">
            {greetMsg}
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;