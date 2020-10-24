"use strict";

const path = require("path");

module.exports = {
  entry: { main: path.resolve(process.cwd(), "sample/js/main.js") },
  output: {
    path: path.resolve(process.cwd(), "dist/js"),
    filename: "[name].js",
    chunkFilename: "[name].bundle.js",
  },
  resolve: {
    extensions: [".js", ".webpack.js", ".web.js"],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
  plugins: [],
  optimization: {
    splitChunks: {
      chunks: "all"
    },
  },
};
