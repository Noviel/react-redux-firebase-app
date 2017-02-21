// Created by snov on 21.12.2016.
//
// Webpack configuration for bundling client
//
//=========================================================================

const path = require('path');
const webpack = require('webpack');

const ManifestPlugin = require('webpack-assets-manifest');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');

const eslintBabelRule = require('./features/eslint-babel');
const imagesRule = require('./features/images');
const fontsRule = require('./features/load-fonts');
const postCss = require('./features/postcss')('client');
const productionPlugins = require('./features/production-plugins');
const { configure, onlyProductionPlugin, onlyDevPlugin, setEntry, setRules, flatten } = require('./utils');

const config = require('./paths');
const rootPath = config.paths.absolute.root;
const assetsPath = config.paths.output.client;
const vendor = ['react', 'react-dom'];

const bootstrapConfig = path.resolve(rootPath, './src/theme/.bootstraprc.json')

module.exports = configure({
  isProduction: process.env.NODE_ENV === 'production',

  features: [
    setEntry({
      __dev__: { vendor },
      main: [
        'bootstrap-loader/lib/bootstrap.loader?extractStyles&' + `configFilePath=${bootstrapConfig}` + '!bootstrap-loader/no-op.js',
        'font-awesome-webpack!./src/theme/font-awesome.config.js',
        './src/client/index.js'
      ]
    }),
    setRules([eslintBabelRule, postCss.rule, imagesRule, fontsRule])
  ]
}, {
  devtool: 'source-map',

  output: {
    filename: '[name].[chunkhash].js',
    path: assetsPath,
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/dist/'
  },

  node: {
    fs: 'empty'
  },

  resolve: {
    modules: [
      'node_modules', path.resolve(rootPath, 'src')
    ]
  },

  plugins: flatten([
    new WebpackChunkHash(),

    // onlyProductionPlugin() returns empty plugin for non-production build
    // and array of input plugins for production.
    // Takes second optional argument `isProduction` with default value:
    // process.env.NODE_ENV === 'production'
    //
    // Flattens arrays, can take this:
    // [ plugin, plugin, iAmReturningArrayOfPlugins()]
    // But resulting array if it is among other plugins should
    // be flattened outside, because webpack needs flat array of plugins.
    // That's why we use `flatten`.
    onlyProductionPlugin([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      productionPlugins
    ]),

    // same for onlyDevPlugin()
    onlyDevPlugin([new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
      filename: '[name].[chunkhash].js',
      minChunks: ({ resource }) => /node_modules/.test(resource)
    })]),

    postCss.plugin,

    new ManifestPlugin(),
    new CleanWebpackPlugin([assetsPath], { root: rootPath, watch: true })
  ])

});