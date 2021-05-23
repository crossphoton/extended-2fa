const { override } = require("customize-cra");
const UglifyJS = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");

const addPlugins = (config) => {
  config.plugins.push(new UglifyJS());
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
  return config;
};

module.exports = override(addPlugins);
