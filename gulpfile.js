"use strict";
const { bundleDevelopment, bundleProduction, watchBundle } = require("./index")(
  "./sample/webpack.config.js"
);

exports.bundleDevelopment = bundleDevelopment;
exports.bundleProduction = bundleProduction;
exports.watchBundle = watchBundle;
