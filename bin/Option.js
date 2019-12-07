"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack = require("webpack");
const path = require("path");
function getCompilerSet(option) {
    var _a, _b;
    if (((_a = option) === null || _a === void 0 ? void 0 : _a.developmentConfigParams) || ((_b = option) === null || _b === void 0 ? void 0 : _b.productionConfigParams)) {
        return getFromParams(option);
    }
    return getFromPath(option);
}
exports.getCompilerSet = getCompilerSet;
function getFromPath(option) {
    var _a, _b;
    let configPath = (_b = (_a = option) === null || _a === void 0 ? void 0 : _a.configPath, (_b !== null && _b !== void 0 ? _b : "./webpack.config.json"));
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
