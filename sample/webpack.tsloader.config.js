"use strict";

const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: { main: path.resolve(process.cwd(), "sample/ts/main.ts") },
    output: {
        path: path.resolve(process.cwd(), "dist/js"),
        filename: "[name].js",
        chunkFilename: "[name].bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: "sample/tsconfig.sample.json"
                        }
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".webpack.js", ".web.js", ".js"],
        alias: {
            ts: path.resolve(__dirname, "./src/ts"),
            local_module: path.resolve(__dirname, "./src/local_module"),
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "initial",
                    name: "vendor",
                    test: /node_modules/,
                    enforce: true,
                },
            },
        },
    },
};
