"use strict";

const webpack = require("webpack");
const path = require("path");

export interface Tasks {
  bundleDevelopment: Function;
  bundleProduction: Function;
  watchBundle: Function;
}

/**
 * webpackでファイルをバンドルする関数を取得する
 * @param {string} configPath webpack.config.jsファイルのパス。 package.jsonからの相対パス or 絶対パス e.g. "./webpack.config.js"
 * @return {Tasks} バンドルタスクのセット
 */

export function get(configPath: string): Tasks {
  if (!path.isAbsolute(configPath)) {
    configPath = path.resolve(process.cwd(), configPath);
  }

  const getConfig = (mode: "development" | "production") => {
    const config = require(configPath);
    config.mode = mode;
    return config;
  };
  const compilerDevelopment = webpack(getConfig("development"));
  const compilerProduction = webpack(getConfig("production"));

  const bundleProduction = (cb: Function) => {
    compile(cb, compilerProduction);
  };
  const bundleDevelopment = (cb: Function) => {
    compile(cb, compilerDevelopment);
  };

  const compile = (cb: Function, compiler) => {
    compiler.run((err, stats) => {
      handleStats(stats);
      if (err || stats.hasErrors()) {
        // Handle errors here
        cb(err);
      }
      cb();
    });
  };

  let watching;
  const watchBundle = () => {
    watching = compilerDevelopment.watch({}, (err, stats) => {
      handleStats(stats);
    });
  };

  const handleStats = stats => {
    if (stats == null) return;
    if (stats.hasErrors()) {
      stats.compilation.errors.forEach(err => {
        console.log(err.message);
      });
      return;
    }
    console.log(
      "'gulptask-webpack' process time : " +
        (stats.endTime - stats.startTime) +
        " ms"
    );
  };

  return {
    bundleDevelopment: bundleDevelopment,
    bundleProduction: bundleProduction,
    watchBundle: watchBundle
  };
}
