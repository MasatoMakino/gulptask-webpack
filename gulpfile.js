"use strict";

const paramDev = require("./sample/webpack.config.js");
const paramProduction = require("./sample/webpack.config.js");

const {
  bundleDevelopment,
  bundleProduction,
  watchBundle
// } = require("./bin").generateTasks({configPath:"./sample/webpack.tsloader.config.js"});
// } = require("./bin").generateTasks({configPath:"./sample/webpack.config.js"});
} = require("./bin").generateTasks({developmentConfigParams:paramDev});


exports.bundleDevelopment = bundleDevelopment;
exports.bundleProduction = bundleProduction;
exports.watchBundle = watchBundle;
