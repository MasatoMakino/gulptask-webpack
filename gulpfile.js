"use strict";

const paramDev = require("./sample/webpack.config.js");
const paramProduction = require("./sample/webpack.config.js");

const {
  bundleDevelopment,
  bundleProduction,
  watchBundle
// } = require("./bin").get({configPath:"./sample/webpack.tsloader.config.js"});
// } = require("./bin").get({configPath:"./sample/webpack.config.js"});
} = require("./bin").get({developmentConfigParams:paramDev});


exports.bundleDevelopment = bundleDevelopment;
exports.bundleProduction = bundleProduction;
exports.watchBundle = watchBundle;
