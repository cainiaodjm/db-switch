/*
 * @Author: your name
 * @Date: 2022-02-16 13:36:50
 * @LastEditTime: 2022-02-17 15:40:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /inspect-demo/src/utils/test.js
 */
// https://juejin.cn/post/6983904373508145189
const arr = [
    { id: 1, name: '部门1', pid: 0 },
    { id: 2, name: '部门2', pid: 1 },
    { id: 3, name: '部门3', pid: 1 },
    { id: 4, name: '部门4', pid: 3 },
    { id: 5, name: '部门5', pid: 4 }
]

function getChildren(data, result, pid) {
    for (const item in data) {
        if (item.id === pid) {
            const newItem = {
                ...item,
                children: []
            }
            result.push(newItem)
            getChildren(data, newItem.children, item.id)
        }
    }
}
const arrayToTree = (data, pid) => {
    const result = []
    getChildren(data, result, pid)
    return result
}

let a = 1

while (a < 10) {
    console.log(a)
    if (a === 6) {
        return false
    }
    a++
}
