import resolve from "@rollup/plugin-node-resolve";

export default {
  // other config options
  plugins: [
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"], // specify extensions if using TypeScript
      browser: true,
      preferBuiltins: false,
    }),
    // other plugins
  ],
};
