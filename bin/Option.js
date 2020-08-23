"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompilerSet = void 0;
const webpack = require("webpack");
const path = require("path");
function getCompilerSet(option) {
    if ((option === null || option === void 0 ? void 0 : option.developmentConfigParams) || (option === null || option === void 0 ? void 0 : option.productionConfigParams)) {
        return getFromParams(option);
    }
    return getFromPath(option);
}
exports.getCompilerSet = getCompilerSet;
function getFromPath(option) {
    var _a;
    let configPath = (_a = option === null || option === void 0 ? void 0 : option.configPath) !== null && _a !== void 0 ? _a : "./webpack.config.json";
    if (!path.isAbsolute(configPath)) {
        configPath = path.resolve(process.cwd(), configPath);
    }
    const getConfig = (mode) => {
        const config = require(configPath);
        config.mode = mode;
        return config;
    };
    return {
        compilerDevelopment: webpack(getConfig("development")),
        compilerProduction: webpack(getConfig("production"))
    };
}
function getFromParams(option) {
    const compilerSet = {};
    if (option.developmentConfigParams) {
        option.developmentConfigParams.mode = "development";
        compilerSet.compilerDevelopment = webpack(option.developmentConfigParams);
    }
    if (option.productionConfigParams) {
        option.productionConfigParams.mode = "production";
        compilerSet.compilerProduction = webpack(option.productionConfigParams);
    }
    return compilerSet;
}
