import { Option } from "./Option";
export interface Tasks {
    bundleDevelopment: Function;
    bundleProduction: Function;
    watchBundle: Function;
}
/**
 * @deprecated Use generateTasks
 * @param option
 */
export declare function get(option: Option): Tasks;
/**
 * webpackでファイルをバンドルする関数を取得する
 * @return バンドルタスクのセット
 * @param option
 */
export declare function generateTasks(option: Option): Tasks;
//# sourceMappingURL=index.d.ts.map