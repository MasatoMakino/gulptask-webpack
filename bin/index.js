"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTasks = exports.get = void 0;
const Option_1 = require("./Option");
/**
 * @deprecated Use generateTasks
 * @param option
 */
function get(option) {
    return generateTasks(option);
}
exports.get = get;
/**
 * webpackでファイルをバンドルする関数を取得する
 * @return バンドルタスクのセット
 * @param option
 */
function generateTasks(option) {
    const compilerSet = Option_1.getCompilerSet(option);
    const { compilerDevelopment, compilerProduction } = compilerSet;
    const generateBundleTask = (compiler) => {
        if (compiler == null)
            return undefined;
        return (cb) => {
            compile(cb, compiler);
        };
    };
    const bundleProduction = generateBundleTask(compilerProduction);
    const bundleDevelopment = generateBundleTask(compilerDevelopment);
    return {
        bundleDevelopment,
        bundleProduction,
        watchBundle: generateWatchTask(option),
    };
}
exports.generateTasks = generateTasks;
/**
 * watchタスクを生成する。
 * @param option
 */
const generateWatchTask = (option) => {
    return () => {
        /**
         * `gulp.series(bundleDevelopment, gulp.series(watchBundle))`
         * のようにgulpタスクをネストすると、各seriesのスコープが変わりwatchタスクではコンパイラが共有できなくなる。
         *
         * そのため、bundleタスクとはコンパイラが共有できない。
         * watch開始時に別インスタンスを生成する。
         */
        const { compilerDevelopment, compilerProduction } = Option_1.getCompilerSet(option);
        const compilerWatcher = compilerDevelopment !== null && compilerDevelopment !== void 0 ? compilerDevelopment : compilerProduction;
        compilerWatcher.watch({}, (err, stats) => {
            handleStats(stats);
        });
    };
};
/**
 * コンパイルを実行する
 * @param cb コールバック関数
 * @param compiler コンパイラ
 */
const compile = (cb, compiler) => {
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
    if (stats == null)
        return;
    if (stats.hasErrors()) {
        stats.compilation.errors.forEach((err) => {
            console.log(err.message);
        });
        return;
    }
    console.log("'gulptask-webpack' process time : " +
        (stats.endTime - stats.startTime) +
        " ms");
};
