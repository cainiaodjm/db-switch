// http://eslint.org/docs/user-guide/configuring

module.exports = {
    // 不查找父级目录配置
    root: true,
    // 配置解析器
    // 避免解析器babel-eslint，vue-eslint-parser配置冲突
    // parser: 'babel-eslint'
    parser: 'vue-eslint-parser',
    parserOptions: {
        // script 默认，module ECMAScript模块
        sourceType: 'module',
        parser: 'babel-eslint',
        ecmaVersion: 2020
    },

    // required to lint *.vue files
    plugins: ['vue', 'html'],
    // 指定目标环境，当前目标环境为浏览器和node
    env: {
        browser: true,
        node: true
    },

    // 配置rules
    rules: {
        // 已声明的变量名称是否允许重新申明，2不允许
        'no-redeclare': 2,
        // 消除未使用的变量，函数和函数的参数
        'no-unused-vars': 0,
        // 强制变量只声明一次
        'one-var': 0,
        // 生产环境不允许debugger
        // 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-debugger': 0,
        // 生产环境不允许console
        // 'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-console': 0,
        // 设置缩进，不是4行缩进报错
        indent: [2, 4, { SwitchCase: 1 }],
        // 强制使用一致的分号书写风格
        semi: [1, 'never'],
        // 函数只有一个参数时，箭头函数是否可以省略括号，0可以
        'arrow-parens': 0,
        // 强制函数(之前是否加空格，always加，never不加
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always'
            }
        ],
        // 禁止new对象时不进行存储
        'no-new': 2,
        // 定义字符串。使用单引号，警告提醒
        quotes: [
            1,
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        // 限制最大空行数量。最大为2
        'no-multiple-empty-lines': [2, { max: 2 }],
        'no-mixed-spaces-and-tabs': 0,
        'operator-linebreak': 0,
        'no-trailing-spaces': 0,
        // 规定逗号前后加上一致的间距。逗号前不加空格，后加空格
        'comma-spacing': ['error', { before: false, after: true }],
        // 强化语句之前的空格间距一致性
        'space-before-blocks': 1,
        'func-call-spacing': 0,
        'linebreak-style': 0,
        // 禁止在逻辑表达式，条件表达式，声明，数组元素，对象属性，序列和函数参数周围使用多个空格。
        // 警告提醒
        'no-multi-spaces': [
            1,
            {
                exceptions: {
                    Property: true,
                    VariableDeclarator: true,
                    ImportDeclaration: true,
                    BinaryExpression: true
                }
            }
        ],
        // 是否允许在换行符之前使用斜线
        'no-multi-str': 0,
        // 是否允许不必要的转义符
        'no-useless-escape': 0,
        // 允许扩展js原生对象
        'no-extend-native': 0,
        // 尽可能使用点符号样式来维护代码一致性并提高代码可读性
        'dot-notation': 0,
        // 允许赋值运算符作为条件语句
        'no-cond-assign': 0,
        // 不判断标签是否自闭合
        'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
        'vue/no-use-v-if-with-v-for': [0],
        // 关闭ts对any类型的校验
        '@typescript-eslint/no-explicit-any': ['off'],
        // ts每个函数都要显式声明返回值
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        // 关闭ts严格模式
        '@typescript-eslint/ban-ts-comment': 'off',
        'no-new-func': 0
    },

    extends: ['plugin:vue/essential', 'standard', 'eslint:recommended', 'prettier']
}
