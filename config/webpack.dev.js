const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')

module.exports = {
  // 入口文件
  entry: {
    main: './src/main.js',
    app: './src/app.js'
  },
  // 输出
  output: {
    path: undefined,
    filename: 'static/js/[name].js'
  },
  // 加载器
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
          },
          {
            test: /\.s[ac]ss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
          },
          {
            test: /\.styl$/,
            use: ['style-loader', 'css-loader', 'stylus-loader']
          },
          {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024
              }
            },
            generator: {
              filename: 'static/imgs/[hash:8][ext][query]'
            }
          },
          {
            test: /\.(ttf|woff2?|map4|map3|avi)$/,
            type: 'asset/resource',
            generator: {
              filename: 'static/media/[hash:8][ext][query]'
            }
          },
          {
            test: /\.js$/,
            include: path.resolve(__dirname, '../src'),
            loader: 'babel-loader',
            options: {
              // 开启babel、eslint缓存
              cacheDirectory: true,
              // 缓存文件不进行压缩
              cacheCompression: false,
              plugins: ['@babel/plugin-transform-runtime']
            }
          }
        ]
      }
    ]
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html')
    }),
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules',
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        '../node_modules/.cache/.eslintcache'
      )
    })
  ],
  // 开发服务器配置
  devServer: {
    host: 'localhost',
    port: '3000',
    open: true,
    hot: true
  },
  // 模式
  mode: 'development',
  devtool: 'eval-cheap-module-source-map'
}
