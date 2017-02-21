// Created by snov on 06.02.2017.
//
// Webpack configuration for bundling server
//
//=========================================================================

const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const eslintBabelRule = require('./features/eslint-babel');
const imagesRule = require('./features/images');
const fontsRule = require('./features/load-fonts');
const postCss = require('./features/postcss')('server');
const { configure, setEntry, setRules } = require('./utils');

const config = require('./paths');
const rootPath = config.paths.absolute.root;
const assetsPath = config.paths.output.server;

module.exports = configure({
  isProduction: process.env.NODE_ENV === 'production',
  production: {
    plugins: require('./features/production-plugins')
  },
  features: [
    setEntry('./src/server/index.js'),
    setRules([eslintBabelRule, postCss.rule, imagesRule, fontsRule])
  ]
}, {
  devtool: 'source-map',
  target: 'node',

  output: {
    filename: '[name].js',
    path: assetsPath,
    publicPath: '/'
  },

  externals: [nodeExternals()],

  plugins: [
    new CleanWebpackPlugin([assetsPath], { root: rootPath })
  ]
});