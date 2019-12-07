import { Option } from "./Option";
export interface Tasks {
    bundleDevelopment: Function;
    bundleProduction: Function;
    watchBundle: Function;
}
/**
 * webpackでファイルをバンドルする関数を取得する
 * @return バンドルタスクのセット
 * @param option
 */
export declare function get(option: Option): Tasks;
//# sourceMappingURL=index.d.ts.map