// Created by snov on 19.02.2017.
//
// Font Loaders
//
//=========================================================================

module.exports = [
  { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
  { test: /\.ttf$/,    loader: "file-loader" },
  { test: /\.eot$/,    loader: "file-loader" },
  { test: /\.svg$/,    loader: "file-loader" }
]