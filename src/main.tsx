
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Check if running in WeChat mini-game environment
const isWeChatMiniGame = typeof wx !== 'undefined';

// Function to initialize the application
function initApp() {
  const rootElement = document.getElementById("root");
  
  if (rootElement) {
    createRoot(rootElement).render(<App />);
  } else {
    console.error("Root element not found");
  }
}

// Handle WeChat mini-game specific initialization
if (isWeChatMiniGame) {
  // Wait for WeChat mini-game to be ready
  wx.onShow(() => {
    console.log("WeChat mini-game is ready");
    initApp();
  });
} else {
  // Regular web environment
  initApp();
}
