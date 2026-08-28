/// <reference types="vitest/config" />

import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      name: "CuteUI",
      cssFileName: "cute-ui",
      fileName: (format) => (format === "es" ? "cute-ui.js" : "cute-ui.cjs"),
      formats: ["es", "cjs"],
    },
    rolldownOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "gsap",
        "gsap/MotionPathPlugin",
      ],
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/components/**/*.{ts,tsx}"],
      exclude: ["src/**/*.stories.tsx"],
    },
  },
});
