// Created by snov on 19.02.2017.
//
// Font Loaders
//
//=========================================================================

module.exports = [
  { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,  loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
  { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,    loader: 'file-loader' }
]