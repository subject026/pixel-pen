const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  target: "web",
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  entry: "./src/Index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  devServer: {
    contentBase: "./dist",
    port: 5000
  },
  node: { fs: "empty" },
  plugins: [
    new webpack.DefinePlugin({
      "process.browser": "true"
    })
    // new BundleAnalyzerPlugin()
  ]
};
