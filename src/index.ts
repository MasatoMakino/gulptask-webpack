"use strict";

import { Option, getCompilerSet } from "./Option";

export interface Tasks {
  bundleDevelopment: Function;
  bundleProduction: Function;
  watchBundle: Function;
}

/**
 * webpackでファイルをバンドルする関数を取得する
 * @return バンドルタスクのセット
 * @param option
 */

export function get(option: Option): Tasks {
  const compilerSet = getCompilerSet(option);

  let bundleProduction;
  let bundleDevelopment;
  if (compilerSet.compilerProduction) {
    bundleProduction = (cb: Function) => {
      compile(cb, compilerSet.compilerProduction);
    };
  }
  if (compilerSet.compilerDevelopment) {
    bundleDevelopment = (cb: Function) => {
      compile(cb, compilerSet.compilerDevelopment);
    };
  }

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

  const compilerWatcher =
    compilerSet.compilerDevelopment ?? compilerSet.compilerProduction;
  let watching;
  const watchBundle = () => {
    watching = compilerWatcher.watch({}, (err, stats) => {
      handleStats(stats);
    });
  };

  const handleStats = (stats) => {
    if (stats == null) return;
    if (stats.hasErrors()) {
      stats.compilation.errors.forEach((err) => {
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
    bundleDevelopment,
    bundleProduction,
    watchBundle,
  };
}
