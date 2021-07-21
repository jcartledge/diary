const path = require("path");
const { IgnorePlugin } = require("webpack");

const { NODE_ENV = "production" } = process.env;

module.exports = {
  entry: "./src/index.ts",
  externalsPresets: { node: true },
  externals: ["bufferutil", "utf-8-validate"],
  mode: NODE_ENV,
  plugins: [
    new IgnorePlugin({
      resourceRegExp: /^pg-native$/,
    }),
  ],
  target: "node",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      graphql$: path.resolve(__dirname, "../node_modules/graphql/index.js"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
      },
    ],
  },
};
