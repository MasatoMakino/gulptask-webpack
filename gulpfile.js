"use strict";
const { bundleDevelopment, bundleProduction, watchBundle } = require("./src")(
  "./sample/webpack.tsloader.config.js"
);

exports.bundleDevelopment = bundleDevelopment;
exports.bundleProduction = bundleProduction;
exports.watchBundle = watchBundle;
