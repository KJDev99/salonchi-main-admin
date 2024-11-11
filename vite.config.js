import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import jsconfigPaths from "vite-jsconfig-paths";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  server: {
    port: 3002,
    open: true,
  },
  plugins: [
    jsconfigPaths(),
    svgr(),
    react(),
    checker({ javascript: true }),
    nodeResolve({ extensions: [".js", ".jsx", ".ts", ".tsx"], browser: true }),
    commonjs(),
  ],
  optimizeDeps: {
    include: ["@ant-design/pro-components"], // Force inclusion
  },
  build: {
    rollupOptions: {
      external: ["react", "react-dom"],
      plugins: [
        nodeResolve({ extensions: [".js", ".jsx", ".ts", ".tsx"] }),
        commonjs(),
      ],
    },
  },
});
