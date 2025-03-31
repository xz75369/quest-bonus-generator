
/**
 * TypeScript declaration file for WeChat Mini Game API
 */

interface WxSystemInfo {
  windowWidth: number;
  windowHeight: number;
  // Add other properties as needed
}

interface WxCanvas extends HTMLCanvasElement {
  // Add WeChat-specific canvas properties if needed
}

/**
 * Global WeChat Mini Game API
 */
declare global {
  const wx: {
    onShow: (callback: () => void) => void;
    onHide: (callback: () => void) => void;
    getSystemInfoSync: () => WxSystemInfo;
    createCanvas: () => WxCanvas;
    // Add other WeChat mini-game API methods as needed
  };
}

export {};
