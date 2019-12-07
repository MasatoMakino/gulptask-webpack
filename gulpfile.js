"use strict";
const {
  bundleDevelopment,
  bundleProduction,
  watchBundle
// } = require("./bin/index").get("./sample/webpack.tsloader.config.js");
} = require("./bin/index").get("./sample/webpack.config.js");

exports.bundleDevelopment = bundleDevelopment;
exports.bundleProduction = bundleProduction;
exports.watchBundle = watchBundle;
