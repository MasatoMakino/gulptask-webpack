"use strict";

import webpack from "webpack";
import { Option, getCompilerSet } from "./Option";

export interface Tasks {
  bundleDevelopment: Function;
  bundleProduction: Function;
  watchBundle: Function;
}

/**
 * @deprecated Use generateTasks
 * @param option
 */
export function get(option: Option): Tasks {
  return generateTasks(option);
}

/**
 * webpackでファイルをバンドルする関数を取得する
 * @return バンドルタスクのセット
 * @param option
 */
export function generateTasks(option: Option): Tasks {
  const compilerSet = getCompilerSet(option);

  const generateBundleTask = (compiler: webpack.Compiler): Function => {
    if (compiler == null) return undefined;
    return (cb: Function) => {
      compile(cb, compiler);
    };
  };
  const bundleProduction = generateBundleTask(compilerSet.compilerProduction);
  const bundleDevelopment = generateBundleTask(compilerSet.compilerDevelopment);

  const compilerWatcher =
    compilerSet.compilerDevelopment ?? compilerSet.compilerProduction;
  let watching;
  const watchBundle = () => {
    watching = compilerWatcher.watch({}, (err, stats) => {
      handleStats(stats);
    });
  };

  return {
    bundleDevelopment,
    bundleProduction,
    watchBundle,
  };
}

/**
 * コンパイルを実行する
 * @param cb コールバック関数
 * @param compiler コンパイラ
 */
const compile = (cb: Function, compiler) => {
  compiler.run((err, stats) => {
    handleStats(stats);
    if (err || stats.hasErrors()) {
      cb(err);
    }
    cb();
  });
};

/**
 * 成功メッセージ、もしくはエラーメッセージをコンソール出力する。
 * @param stats
 */
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
