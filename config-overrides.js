const { override, addWebpackAlias } = require("customize-cra");
const RemoveDuplicate = require("duplicate-package-checker-webpack-plugin");
const UglifyJS = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
// const CompressPlugin = require("compression");

const addPlugins = (config) => {
  config.plugins.push(new RemoveDuplicate());
  config.plugins.push(new UglifyJS());
  //   config.plugins.push(
  //     new CompressPlugin({
  //       asset: "[path].gz[query]",
  //       algorithm: "gzip",
  //       //   test: /\.js$|\.css$|\.html$/,
  //       threshold: 10240,
  //       minRatio: 0.8,
  //     })
  //   );
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
  //   config.plugins.push(new webpack.optimize.MinChunkSizePlugin());
  return config;
};

module.exports = override(
  addWebpackAlias({
    ["react"]: "preact/compat",
    ["react-dom"]: "preact/compat",
  }),
  addPlugins
);
