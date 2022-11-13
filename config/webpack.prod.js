const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = {
  // 入口文件
  entry: './src/main.js',
  // 输出
  output: {
    // 所有文件输出目录
    path: path.resolve(__dirname, '../dist'),
    // 文件输出名
    filename: 'static/js/main.js',
    // 自动清理path目录资源清空
    clean: true
  },
  // 加载器
  module: {
    rules: [
      {
        oneOf: [
          {
            // 正则匹配文件
            test: /\.css$/,
            // Loader 执行顺序
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: ['postcss-preset-env']
                  }
                }
              }
            ]
          },
          {
            test: /\.(png|jpe?g|gif|webp)$/,
            // 转 base64
            type: 'asset',
            parser: {
              dataUrlCondition: {
                // 小于 10kb 的会被 base64 处理
                maxSize: 10 * 1024
              }
            },
            generator: {
              // 将图片文件输出到 static/imgs 目录中
              // 将图片文件命名 [hash:8][ext][query]
              // [hash:8]: hash值取8位
              // [ext]: 使用之前的文件扩展名
              // [query]: 添加之前的query参数
              filename: 'static/imgs/[hash:8][ext][query]'
            }
          },
          {
            test: /\.(ttf|woff2?)$/,
            // 原封输出
            type: 'asset/resource',
            generator: {
              filename: 'static/media/[hash:8][ext][query]'
            }
          },
          {
            test: /\.js$/,
            exclude: /node_modules/, // 排除node_modules代码不编译
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-transform-runtime'] // 减少代码体积
            }
          }
        ]
      }
    ]
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      // 以该文件为模板创建文件
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, '../src')
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/main.css'
    }),
    new CssMinimizerPlugin()
  ],
  // 模式
  mode: 'production',
  devtool: 'source-map'
}
