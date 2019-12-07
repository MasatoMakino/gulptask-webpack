const webpack = require("webpack");
const path = require("path");

/**
 * configPath webpack.config.jsファイルのパス。 package.jsonからの相対パス or 絶対パス e.g. "./webpack.config.js"
 */
export interface Option {
  configPath?: string;
  developmentConfigParams?: any;
  productionConfigParams?: any;
}

export interface CompilerSet {
  compilerDevelopment?: any;
  compilerProduction?: any;
}

export function getCompilerSet(option: Option): CompilerSet {
  if (option?.developmentConfigParams || option?.productionConfigParams) {
    return getFromParams(option);
  }

  return getFromPath(option);
}

function getFromPath(option: Option): CompilerSet {
  let configPath: string = option?.configPath ?? "./webpack.config.json";
  if (!path.isAbsolute(configPath)) {
    configPath = path.resolve(process.cwd(), configPath);
  }

  const getConfig = (mode: "development" | "production") => {
    const config = require(configPath);
    config.mode = mode;
    return config;
  };

  return {
    compilerDevelopment: webpack(getConfig("development")),
    compilerProduction: webpack(getConfig("production"))
  };
}

function getFromParams(option: Option): CompilerSet {
  const compilerSet: CompilerSet = {};

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
