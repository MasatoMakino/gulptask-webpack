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
export declare function getCompilerSet(option: Option): CompilerSet;
//# sourceMappingURL=Option.d.ts.map