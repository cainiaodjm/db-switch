/*
 * @Author: your name
 * @Date: 2022-02-25 09:14:23
 * @LastEditTime: 2022-03-01 16:46:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /inspect-demo/src/service/db.js
 */
import axios from 'axios'

/**
 * DB 切换参数
 */
export function checkAdgConfig(data) {
    return axios.post('/check_adg_config', data)
}
/**
 * DB 当前状态
 */
export function checkAdgStatus(data) {
    return axios.post('/check_adg_status', data)
}

/** 数据库登录 */
export function dbLogin(data) {
    return axios.post('/dblogin', data)
}

/** 服务器登录 */
export function osLogin(data) {
    return axios.post('/oslogin', data)
}

export function switchoverS2p(data) {
    return axios.post('/switchover_s2p', data)
}