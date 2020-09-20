import webpack from "webpack";
const path = require("path");

/**
 * configPath webpack.config.jsファイルのパス。 package.jsonからの相対パス or 絶対パス e.g. "./webpack.config.js"
 */
export interface Option {
  configPath?: string;
  developmentConfigParams?: webpack.Configuration;
  productionConfigParams?: webpack.Configuration;
}

export interface CompilerSet {
  compilerDevelopment?: webpack.Compiler;
  compilerProduction?: webpack.Compiler;
}

/**
 * コンパイラセットを取得する
 * 渡されたオプションに応じ、FromPath関数かFromParams関数に分岐する。
 * @param option
 */
export function getCompilerSet(option: Option): CompilerSet {
  if (option?.developmentConfigParams || option?.productionConfigParams) {
    return getFromParams(option);
  }
  return getFromPath(option);
}

function getFromPath(option: Option): CompilerSet {
  const normalizePath = (configPath: string): string => {
    const normalized = configPath ?? "./webpack.config.json";
    if (path.isAbsolute(normalized)) return normalized;
    return path.resolve(process.cwd(), normalized);
  };
  const configPath = normalizePath(option?.configPath);

  const getConfig = (
    mode: "development" | "production"
  ): webpack.Configuration => {
    const config: webpack.Configuration = require(configPath);
    config.mode = mode;
    return config;
  };

  return {
    compilerDevelopment: webpack(getConfig("development")),
    compilerProduction: webpack(getConfig("production")),
  };
}

function getFromParams(option: Option): CompilerSet {
  const compilerSet: CompilerSet = {};

  compilerSet.compilerDevelopment = generateCompiler(
    option.developmentConfigParams,
    "development"
  );

  compilerSet.compilerProduction = generateCompiler(
      option.productionConfigParams,
      "production"
  );

  return compilerSet;
}

function generateCompiler(
  param: webpack.Configuration,
  mode: "development" | "production"
): webpack.Compiler {
  if (!param) return undefined;
  param.mode = mode;
  return webpack(param);
}
