
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Check if running in WeChat mini-game environment
const isWeChatMiniGame = typeof wx !== 'undefined';

// Function to initialize the application
function initApp() {
  // In WeChat mini-game environment, we need to create a DOM container
  if (isWeChatMiniGame) {
    const systemInfo = wx.getSystemInfoSync();
    
    // Create document body if it doesn't exist
    if (!document.body) {
      const body = document.createElement('body');
      document.documentElement.appendChild(body);
    }
    
    // Create root element
    const rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);
    
    // Adjust viewport size
    rootElement.style.width = `${systemInfo.windowWidth}px`;
    rootElement.style.height = `${systemInfo.windowHeight}px`;
    
    // Render React app
    createRoot(rootElement).render(<App />);
  } else {
    // Regular web environment
    const rootElement = document.getElementById("root");
    
    if (rootElement) {
      createRoot(rootElement).render(<App />);
    } else {
      console.error("Root element not found");
    }
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
