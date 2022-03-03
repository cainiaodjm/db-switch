/*
 * @Author: your name
 * @Date: 2022-02-16 13:16:56
 * @LastEditTime: 2022-02-28 13:48:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /inspect-demo/src/utils/globalConstants.js
 */

import Vue from 'vue'
// 后端统一一级路由
export const baseURL = '/api'
// 全局枚举
export const enumData = {}
// 数据库角色
enumData['database_role'] = [
    { value: 'PHYSICAL STANDBY', label: '从数据库', alias: 'S' },
    { value: 'PHYSICAL STANDBY', label: '主数据库', alias: 'P' }
]
// 驼峰转换
const CAMEL_CASE = /-(\w)/g
export function camelCase(key, regex) {
    if (regex) return key.replace(regex, (_, $1) => $1.toUpperCase())
    else return key.replace(CAMEL_CASE, (_, $1) => $1.toUpperCase())
}
for (const enumeCode in enumData) {
    enumData[camelCase(enumeCode)] = enumData[enumeCode]
}
// 枚举统一调用方法，防止使用过程中污染源数据
// code枚举key值
// type设置是否强制转换value类型，不需要可不传

export function enumerate(code, type) {
    // 缓存优化，将生成的对象缓存到vue实例化组件上
    if (this instanceof Vue) {
        const key = 'enumerate_' + code
        const self = this._self
        !self[key] && (self[key] = enumerate(code, type))
        return self[key]
    }
    const select = enumData[camelCase(code)]
    if (select) {
        return select.map((item) => {
            switch (type) {
                case 'number':
                    return { ...item, value: parseFloat(item.value) || item.value }
                case 'string':
                    return { ...item, value: String(item.value) || item.value }
            }
            return { ...item }
        })
    }
    return []
}

// 获取枚举默认的第一个参数值

enumerate.defalut = (code) => {}
