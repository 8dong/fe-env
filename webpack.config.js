const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV ?? 'development';

module.exports = {
  mode,
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(jpeg|jpg|png|svg)$/,
        type: 'asset',
        generator: {
          filename: 'assets/[name][hash][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 40 * 1024
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
      Build Date: ${new Date().toLocaleString()}
      `
    }),
    new webpack.EnvironmentPlugin([]),
    new webpack.DefinePlugin({}),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: mode === 'development' ? false : true,
        collapseWhitespace: mode === 'development' ? false : true
      }
    }),
    new CleanWebpackPlugin(),
    ...(mode === 'development'
      ? []
      : [
          new MiniCssExtractPlugin({
            filename: '[name].css'
          })
        ])
  ]
};
