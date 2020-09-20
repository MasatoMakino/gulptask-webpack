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
    var _a;
    const compilerSet = Option_1.getCompilerSet(option);
    const generateBundleTask = (compiler) => {
        if (compiler == null)
            return undefined;
        return (cb) => {
            compile(cb, compiler);
        };
    };
    const bundleProduction = generateBundleTask(compilerSet.compilerProduction);
    const bundleDevelopment = generateBundleTask(compilerSet.compilerDevelopment);
    const compilerWatcher = (_a = compilerSet.compilerDevelopment) !== null && _a !== void 0 ? _a : compilerSet.compilerProduction;
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
exports.generateTasks = generateTasks;
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
