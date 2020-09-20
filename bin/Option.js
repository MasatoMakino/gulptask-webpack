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
    const normalizePath = (configPath) => {
        const normalized = configPath !== null && configPath !== void 0 ? configPath : "./webpack.config.json";
        if (path.isAbsolute(normalized))
            return normalized;
        return path.resolve(process.cwd(), normalized);
    };
    const configPath = normalizePath(option === null || option === void 0 ? void 0 : option.configPath);
    const getConfig = (mode) => {
        const config = require(configPath);
        config.mode = mode;
        return config;
    };
    return {
        compilerDevelopment: webpack(getConfig("development")),
        compilerProduction: webpack(getConfig("production")),
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
