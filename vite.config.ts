
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Create entry point file for WeChat mini-game
  const createGameJsFile = () => ({
    name: 'create-game-js',
    closeBundle() {
      // Create a directory for the game assets if it doesn't exist
      if (!fs.existsSync('dist')) {
        fs.mkdirSync('dist');
      }
      
      // Create a minimal entry point that imports the main bundle
      const gameJsContent = `
// game.js for WeChat Mini Game
require('./assets/index.js');

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
          // Bundle everything into a single file
          format: 'iife',
          entryFileNames: 'assets/index.js',
          chunkFileNames: 'assets/index.js',
          assetFileNames: 'assets/[name].[ext]',
          // Ensure everything is bundled into one file
          manualChunks: undefined,
          inlineDynamicImports: true
        }
      }
    }
  };
});
