"use strict";
const {
    bundleDevelopment,
    bundleProduction,
    watchBundle,
} = require("./index")("./webpack.config.js");

exports.bundleDevelopment = bundleDevelopment;
exports.bundleProduction = bundleProduction;
exports.watchBundle = watchBundle;