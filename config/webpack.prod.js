const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin')

module.exports = {
  entry: {
    main: './src/main.js',
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    // [name]是webpack命名规则，使用chunk的name作为输出的文件名。
    // 什么是chunk？打包的资源就是chunk，输出出去叫bundle。
    // chunk的name是啥呢？ 比如： entry中xxx: "./src/xxx.js", name就是xxx。注意是前面的xxx，和文件名无关。
    // 为什么需要这样命名呢？如果还是之前写法main.js，那么打包生成两个js文件都会叫做main.js会发生覆盖。(实际上会直接报错的)
    // [contenthash:8]使用contenthash，取8位长度
    filename: 'static/js/[name].[contenthash:8].js', // 入口文件打包输出资源命名方式
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js', // 动态导入输出资源命名方式
    assetModuleFilename: 'static/media/[name].[hash][ext]', // 图片、字体等资源命名方式（注意用hash）
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
            }
            // generator: {
            //   // 将图片文件输出到 static/imgs 目录中
            //   // 将图片文件命名 [hash:8][ext][query]
            //   // [hash:8]: hash值取8位
            //   // [ext]: 使用之前的文件扩展名
            //   // [query]: 添加之前的query参数
            //   filename: 'static/imgs/[hash:8][ext][query]'
            // }
          },
          {
            test: /\.(ttf|woff2?)$/,
            // 原封输出
            type: 'asset/resource'
            // generator: {
            //   filename: 'static/media/[hash:8][ext][query]'
            // }
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
      template: path.resolve(__dirname, '../src/index.html')
    }),
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, '../src')
    }),
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
    }),
    new CssMinimizerPlugin(),
    new PreloadWebpackPlugin({
      rel: 'preload', // preload兼容性更好
      as: 'script'
      // rel: 'prefetch' // prefetch兼容性更差
    })
  ],
  // 代码分割配置
  splitChunks: {
    chunks: 'all' // 对所有模块都进行分割
    // 其他内容用默认配置即可
  },
  // 提取runtime文件
  runtimeChunk: {
    name: (entrypoint) => `runtime~${entrypoint.name}` // runtime文件命名规则
  },
  // 模式
  mode: 'production',
  devtool: 'source-map'
}
