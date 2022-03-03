module.exports = {
    extends: 'stylelint-config-standard',
    plugins: ['stylelint-scss'],
    // 不符合规范时为警告或者报错
    defaultSeverity: 'error',
    rules: {
        // 首行缩进
        indentation: [4],
        // 使用双引号
        'string-quotes': 'single',
        // 分隔多个选择器之间的 "," 后可以不换行
        // 'selector-list-comma-newline-after': null,
        'rule-empty-line-before': null,
        // 不检查在声明块内尾随分号
        'declaration-block-trailing-semicolon': null,
        // 字体必须设置的通用字体
        'font-family-no-missing-generic-family-keyword': null,
        // 对空格的处理
        // '{' 前必须有空格
        'block-opening-brace-space-before': 'always',
        // 注释 "/*" 后和 "*/" 前必须有空格
        'comment-whitespace-inside': 'always',
        'declaration-block-semicolon-space-after': null,
        // 属性名 ":" 后必须有空格
        'declaration-colon-space-after': 'always',
        // 属性名 ":" 前不能有空格
        'declaration-colon-space-before': 'never',
        'declaration-colon-newline-after': null,
        // 声明属性末尾 ";" 前不能有空格
        'declaration-block-semicolon-space-before': 'never',
        // 属性值中的 "," 后必须有空格
        'function-comma-space-after': 'always',
        // 选择器例如 ">、+、~" 前后必须要有空格
        'selector-combinator-space-before': 'always',
        'selector-combinator-space-after': 'always',
        // 分隔多个选择器之间的 "," 后必须有空格
        // 'selector-list-comma-space-after': null,
        // 分隔多个选择器之间的 "," 前不能有空格
        // 'selector-list-comma-space-before': 'never',
        // 子代选择器之间没有额外空格
        'selector-descendant-combinator-no-non-space': true,
        // 多个属性值之间的 "," 后必须有空格，针对单行
        'value-list-comma-space-after': 'always-single-line',
        // 多个属性值之间的 "," 前不能有空格
        'value-list-comma-space-before': 'never',
        // 多个属性值之间的 "," 后不能有空格
        'value-list-comma-newline-after': 'always-multi-line',
        // 媒体查询中设置断点宽度里的 ":" 后必须有空格
        'media-feature-colon-space-after': 'always',
        // 媒体查询中设置断点宽度里的 ":" 前不能有空格
        'media-feature-colon-space-before': 'never',
        // 禁止未知的规则
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['function', 'if', 'each', 'include', 'mixin', 'for']
            }
        ],
        // 禁止未知的伪元素选择器
        'selector-pseudo-element-no-unknown': [
            true,
            {
                ignorePseudoElements: ['v-deep']
            }
        ],
        // 文件末尾要加空行
        'no-missing-end-of-source-newline': true,
        // 不允许低特异性的选择器出现在覆盖高特异性的选择器之后
        'no-descending-specificity': null,
        // 限制选择器中相邻空行的数量
        'selector-max-empty-lines': 1,
        'length-zero-no-unit': null
    }
}
