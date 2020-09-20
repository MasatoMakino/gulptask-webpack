"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompilerSet = void 0;
const webpack_1 = __importDefault(require("webpack"));
const path = require("path");
/**
 * コンパイラセットを取得する
 * 渡されたオプションに応じ、FromPath関数かFromParams関数に分岐する。
 * @param option
 */
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
        compilerDevelopment: webpack_1.default(getConfig("development")),
        compilerProduction: webpack_1.default(getConfig("production")),
    };
}
function getFromParams(option) {
    const compilerSet = {};
    compilerSet.compilerDevelopment = generateCompiler(option.developmentConfigParams, "development");
    compilerSet.compilerProduction = generateCompiler(option.productionConfigParams, "production");
    return compilerSet;
}
function generateCompiler(param, mode) {
    if (!param)
        return undefined;
    param.mode = mode;
    return webpack_1.default(param);
}
