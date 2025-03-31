
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Create game.js file for WeChat mini-game
  const createGameJsFile = () => ({
    name: 'create-game-js',
    closeBundle() {
      const gameJsContent = `
// game.js for WeChat Mini Game
import './assets/index.js';

// WeChat mini-game initialization
wx.onShow(function() {
  console.log('Game shown');
});

wx.onHide(function() {
  console.log('Game hidden');
});

// Setup canvas
const systemInfo = wx.getSystemInfoSync();
const canvas = wx.createCanvas();
canvas.width = systemInfo.windowWidth;
canvas.height = systemInfo.windowHeight;
      `;
      
      // Ensure dist directory exists
      if (!fs.existsSync('dist')) {
        fs.mkdirSync('dist');
      }
      
      // Write game.js file
      fs.writeFileSync('dist/game.js', gameJsContent);
    }
  });

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
      mode === 'production' && createGameJsFile(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      minify: true,
      // Optimize for WeChat mini-game environment
      target: 'es2015',
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          manualChunks: undefined,
          // WeChat mini-games have specific naming conventions and size limits
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]',
        }
      }
    }
  };
});
