"use strict";
const { bundleDevelopment, bundleProduction, watchBundle } = require("./index")(
  "./sample/webpack.tsloader.config.js"
);

exports.bundleDevelopment = bundleDevelopment;
exports.bundleProduction = bundleProduction;
exports.watchBundle = watchBundle;
