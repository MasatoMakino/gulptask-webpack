import webpack from "webpack";
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
export declare function getCompilerSet(option: Option): CompilerSet;
//# sourceMappingURL=Option.d.ts.map