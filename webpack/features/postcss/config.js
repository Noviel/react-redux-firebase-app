// Created by snov on 21.09.2016.

module.exports = {
  plugins: () => [
    require('autoprefixer'),
    require('precss'),
    require('postcss-autoreset')({
      reset: 'initial'
    }),
    require('postcss-initial')({
      reset: 'inherited'
    })
      //require('postcss-import'),
  ]
};