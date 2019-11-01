/* eslint-disable no-undef */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const path = require('path');

module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'game/app.js'),
    ],
  },
  output: {
    path: __dirname + '/dist/',
    filename: 'js/app.bundle.js',
    chunkFilename: 'js/[name].bundle.js',
  },
  module: {
    rules: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!resolve-url-loader"
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, './assets/css/'),
        loader: "style-loader!css-loader!resolve-url-loader!sass-loader"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          },
        }]
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/style.css'
    }),
    new HtmlWebpackPlugin({
      title: 'ABTDG',
      template: './index.html'
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'allAssets'
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      gifsicle: { // lossless gif compressor
        optimizationLevel: 9
      },
      pngquant: ({ // lossy png compressor, remove for default lossless
        quality: '75'
      }),
      plugins: [imageminMozjpeg({ // lossy jpg compressor, remove for default lossless
        quality: '75'
      })]
    })
  ]
};
