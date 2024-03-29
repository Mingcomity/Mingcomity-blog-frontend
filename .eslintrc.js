module.exports = {
  // 继承 Eslint 规则
  extends: ['eslint:recommended'],
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
    es6: true
  },
  parser: '@babel/eslint-parser',
  plugins: ['import'], // 解决动态导入import语法报错问题 --> 实际使用eslint-plugin-import的规则解决的
  // 解析选项
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  // 具体检查规则，可覆盖上面所继承规则
  rules: {
    'no-var': 2, // 不能使用 var 定义变量,
    'no-useless-catch': 1, // 连续抛出错误
    'no-debugger': 0
  }
}
