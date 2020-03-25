const path = require('path');
const fs = require('fs')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

function generateHtmlPlugins (dir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, dir))

  return templateFiles.filter(function(file) {
    if (file.split('.').pop() != "html") {
      return false;
    }
    return true;
  }).map(function(file) { 
    const parts = file.split('.')
    const name = parts[0]
    const extension = parts[1]

    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${dir}/${name}.${extension}`)
    })
  });
}

const htmlPlugins = generateHtmlPlugins('./src');

module.exports = {
  entry: './src/main.js',
  module: {
    rules: [{ 
      test: /\.js$/, 
      use: {
        loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }}
    },
    { 
      test: /\.vue$/, use: 'vue-loader'
    },
    { 
      test: /\.css$/, use: ['vue-style-loader', 'css-loader']
    }]
  },
  devServer: {
    open: true,
    hot: true,
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ].concat(htmlPlugins)
};