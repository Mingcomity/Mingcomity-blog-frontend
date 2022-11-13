module.exports = {
  // 继承 Eslint 规则
  extends: ['eslint:recommended'],
  env: {
    node: true, // 启用node中全局变量
    browser: true // 启用浏览器中全局变量
  },
  parser: '@babel/eslint-parser',
  // 解析选项
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  // 具体检查规则，可覆盖上面所继承规则
  rules: {
    'no-var': 2, // 不能使用 var 定义变量,
    'no-undef': 0,
    'no-unused-vars': 0
  }
}
