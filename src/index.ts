"use strict";

import { Option, getCompiler } from "./Option";

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
  const generateBundleTask = (
    option: Option,
    mode: "development" | "production"
  ) => {
    return async () => {
      const compiler = await getCompiler(option, mode);
      if (compiler == null) return undefined;
      compiler.run((err, stats) => {
        handleStats(stats);
      });
    };
  };

  return {
    bundleDevelopment: generateBundleTask(option, "development"),
    bundleProduction: generateBundleTask(option, "production"),
    watchBundle: generateWatchTask(option),
  };
}

/**
 * watchタスクを生成する。
 * @param option
 */
const generateWatchTask = (option: Option) => {
  return async () => {
    /**
     * `gulp.series(bundleDevelopment, gulp.series(watchBundle))`
     * のようにgulpタスクをネストすると、各seriesのスコープが変わりwatchタスクではコンパイラが共有できなくなる。
     *
     * そのため、bundleタスクとはコンパイラが共有できない。
     * watch開始時に別インスタンスを生成する。
     */
    let compilerWatcher =
      (await getCompiler(option, "development")) ??
      (await getCompiler(option, "production"));

    compilerWatcher.watch({}, (err, stats) => {
      handleStats(stats);
    });
  };
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
