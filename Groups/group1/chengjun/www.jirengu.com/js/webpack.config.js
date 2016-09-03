
var webpack = require('webpack')
commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
  entry: 
    ['./entry.js','./couse.js','./carousel.js','./move.js','./jquery.js','./weather.js']
  ,
  output: {
    path: '../dist',
    filename: '[name]merge.js'
  },
}