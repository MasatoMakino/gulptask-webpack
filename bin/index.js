"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack = require("webpack");
const path = require("path");
/**
 * webpackでファイルをバンドルする関数を取得する
 * @param {string} configPath webpack.config.jsファイルのパス。 package.jsonからの相対パス or 絶対パス e.g. "./webpack.config.js"
 * @return {Tasks} バンドルタスクのセット
 */
function get(configPath) {
    if (!path.isAbsolute(configPath)) {
        configPath = path.resolve(process.cwd(), configPath);
    }
    const getConfig = (mode) => {
        const config = require(configPath);
        config.mode = mode;
        return config;
    };
    const compilerDevelopment = webpack(getConfig("development"));
    const compilerProduction = webpack(getConfig("production"));
    const bundleProduction = (cb) => {
        compile(cb, compilerProduction);
    };
    const bundleDevelopment = (cb) => {
        compile(cb, compilerDevelopment);
    };
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
    let watching;
    const watchBundle = () => {
        watching = compilerDevelopment.watch({}, (err, stats) => {
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
        bundleDevelopment: bundleDevelopment,
        bundleProduction: bundleProduction,
        watchBundle: watchBundle
    };
}
exports.get = get;
