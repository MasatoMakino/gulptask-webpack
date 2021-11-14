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

/**
 * コンパイラセットを取得する
 * 渡されたオプションに応じ、FromPath関数かFromParams関数に分岐する。
 * @param option
 * @param mode
 */
export async function getCompiler(
  option: Option,
  mode: "development" | "production"
): Promise<webpack.Compiler> {
  if (option?.developmentConfigParams || option?.productionConfigParams) {
    const config =
      mode === "development"
        ? option.developmentConfigParams
        : option.productionConfigParams;
    return generateCompiler(config, mode);
  }
  return await getFromPath(option, mode);
}

async function getFromPath(
  option: Option,
  mode: "development" | "production"
): Promise<webpack.Compiler> {
  const normalizePath = (configPath: string): string => {
    const normalized = configPath ?? "./webpack.config.json";
    if (path.isAbsolute(normalized)) return normalized;
    return path.resolve(process.cwd(), normalized);
  };
  const configPath = normalizePath(option?.configPath);
  return webpack(await getConfig(configPath, mode));
}

/**
 * WebPack設定ファイルを読み込む
 * @param filePath
 * @param mode
 */
async function getConfig(
  filePath: string,
  mode: "development" | "production"
): Promise<webpack.Configuration> {
  const configModule = await import(filePath);
  const config: webpack.Configuration = configModule.default;
  config.mode = mode;
  return config;
}

function generateCompiler(
  param: webpack.Configuration,
  mode: "development" | "production"
): webpack.Compiler {
  if (!param) return undefined;
  param.mode = mode;
  return webpack(param);
}
