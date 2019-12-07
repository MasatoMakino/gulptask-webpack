export interface Tasks {
    bundleDevelopment: Function;
    bundleProduction: Function;
    watchBundle: Function;
}
/**
 * webpackでファイルをバンドルする関数を取得する
 * @param {string} configPath webpack.config.jsファイルのパス。 package.jsonからの相対パス or 絶対パス e.g. "./webpack.config.js"
 * @return {Tasks} バンドルタスクのセット
 */
export declare function get(configPath: string): Tasks;
//# sourceMappingURL=index.d.ts.map