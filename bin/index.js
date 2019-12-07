"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = require("./Option");
/**
 * webpackでファイルをバンドルする関数を取得する
 * @return バンドルタスクのセット
 * @param option
 */
function get(option) {
    var _a;
    const compilerSet = Option_1.getCompilerSet(option);
    let bundleProduction;
    let bundleDevelopment;
    if (compilerSet.compilerProduction) {
        bundleProduction = (cb) => {
            compile(cb, compilerSet.compilerProduction);
        };
    }
    if (compilerSet.compilerDevelopment) {
        bundleDevelopment = (cb) => {
            compile(cb, compilerSet.compilerDevelopment);
        };
    }
    const compile = (cb, compiler) => {
        compiler.run((err, stats) => {
            handleStats(stats);
            if (err || stats.hasErrors()) {
                // Handle errors here
                cb(err);
            }
            cb();
        });
    };
    const compilerWatcher = (_a = compilerSet.compilerDevelopment, (_a !== null && _a !== void 0 ? _a : compilerSet.compilerProduction));
    let watching;
    const watchBundle = () => {
        watching = compilerWatcher.watch({}, (err, stats) => {
            handleStats(stats);
        });
    };
    const handleStats = stats => {
        if (stats == null)
            return;
        if (stats.hasErrors()) {
            stats.compilation.errors.forEach(err => {
                console.log(err.message);
            });
            return;
        }
        console.log("'gulptask-webpack' process time : " +
            (stats.endTime - stats.startTime) +
            " ms");
    };
    return {
        bundleDevelopment,
        bundleProduction,
        watchBundle
    };
}
exports.get = get;
