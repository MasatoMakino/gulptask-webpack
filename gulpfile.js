"use strict";
const { series } = require("gulp");
const paramDev = require("./sample/webpack.config.js");
const paramProduction = require("./sample/webpack.config.js");

const { bundleDevelopment, bundleProduction, watchBundle } =
  require("./bin").generateTasks({
    configPath: "./sample/webpack.tsloader.config.js",
  });
// } = require("./bin").generateTasks({configPath:"./sample/webpack.config.js"});
// } = require("./bin").generateTasks({developmentConfigParams:paramDev, productionConfigParams:paramProduction});

exports.bundleDevelopment = bundleDevelopment;
exports.bundleProduction = bundleProduction;
//seriesがネストしても正常に動作するかを確認するためのコードです。
exports.watchBundle = series(bundleDevelopment, series(watchBundle));
