/*
 * @Author: your name
 * @Date: 2022-02-16 14:00:47
 * @LastEditTime: 2022-02-24 15:20:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /inspect-demo/src/service/sysApi.js
 */
import axios from 'axios'
import path from 'path'
// import fs from 'fs'
// import child_process from 'child_process'
// child_process.spawn
function resolve(dir) {
    console.log(__dirname, dir)
    return path.join(__dirname, dir)
}
/* 登录 */
export function login(data) {
    return axios.post('/user/login', data)
}
export function getPython() {
    // fetch('./helloworld.js')
    // return axios.get('./helloworld.js')
    console.log(resolve(__dirname, './src/service'))
    return axios({
        baseURL: resolve(__dirname, './src/service'),
        url: './helloworld.js',
        method: 'get'
    })
    // return fetch('./helloworld.js')
}
export function getTest(data) {
    return axios.post('/get_tasks', data)
}
export function checkAdgStatus(data) {
    return axios.post('/check_adg_status', data)
}
